import * as drizzle from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { Context, HonoEnv } from 'hono';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { projectLocalizations, projects } from '../schema';
import {
  HttpNotFound,
  LanguageCode,
  parseDateTime,
  ProjectStatus,
} from '../utils';
import {
  DeleteProjectImageSchema,
  SortProjectImageSchema,
  UpsertProjectLocalizationSchema,
  UpsertProjectSchema,
} from '../validators';
import { BaseService } from './base';

const projectsSelect = {
  id: projects.id,
  thumbSrc: projects.thumbSrc,
  sort: projects.sort,
  isPublished: projects.isPublished,
  startDate: projects.startDate,
  endDate: projects.endDate,
  status: projects.status,
  views: projects.views,
  createdAt: projects.createdAt,
  updatedAt: projects.updatedAt,
  projectLocalizations: {
    id: projectLocalizations.id,
    slug: projectLocalizations.slug,
    languageCode: projectLocalizations.languageCode,
    title: projectLocalizations.title,
    createdAt: projectLocalizations.createdAt,
    updatedAt: projectLocalizations.updatedAt,
  },
};

const projectSelect = {
  id: projects.id,
  thumbSrc: projects.thumbSrc,
  sort: projects.sort,
  isPublished: projects.isPublished,
  startDate: projects.startDate,
  endDate: projects.endDate,
  status: projects.status,
  imageSrcs: projects.imageSrcs,
  languages: projects.languages,
  frameworks: projects.frameworks,
  databases: projects.databases,
  technologies: projects.technologies,
  others: projects.others,
  views: projects.views,
  projectLocalizations: {
    id: projectLocalizations.id,
    slug: projectLocalizations.slug,
    languageCode: projectLocalizations.languageCode,
    title: projectLocalizations.title,
    description: projectLocalizations.description,
    client: projectLocalizations.client,
    website: projectLocalizations.website,
    source: projectLocalizations.source,
    createdAt: projectLocalizations.createdAt,
    updatedAt: projectLocalizations.updatedAt,
  },
};

export class ProjectsService extends BaseService {
  constructor(context: Context<HonoEnv>) {
    super(context);
  }

  protected async setProjectTemporaryLink(project: {
    thumbSrc?: string | null;
    imageSrcs?: Array<string> | null;
  }) {
    if (project.thumbSrc) {
      project.thumbSrc = await this.getTemporaryLink(project.thumbSrc);
    }

    if (project.imageSrcs) {
      project.imageSrcs = _.compact(
        await Promise.all(
          _.map(project.imageSrcs, (src) => this.getTemporaryLink(src)),
        ),
      );
    }
  }

  async getAll(query: {
    title?: string;
    client?: string;
    status?: Array<ProjectStatus>;
    language?: Array<LanguageCode>;
  }) {
    const andWhere: drizzle.SQL[] = [];

    if (query.status?.length) {
      andWhere.push(drizzle.inArray(projects.status, query.status));
    }

    if (query.title || query.client || query.language) {
      const projectLocalizationsForWhere = alias(
        projectLocalizations,
        'projectLocalizationsForWhere',
      );

      const andWhereProjectLocalizations: drizzle.SQL[] = [];

      if (query.title) {
        andWhereProjectLocalizations.push(
          drizzle.like(projectLocalizationsForWhere.title, `%${query.title}%`),
        );
      }

      if (query.client) {
        andWhereProjectLocalizations.push(
          drizzle.like(
            projectLocalizationsForWhere.client,
            `%${query.client}%`,
          ),
        );
      }

      if (query.language) {
        andWhereProjectLocalizations.push(
          drizzle.inArray(
            projectLocalizationsForWhere.languageCode,
            query.language,
          ),
        );
      }

      if (andWhereProjectLocalizations.length) {
        andWhere.push(
          drizzle.exists(
            this.db
              .select({ id: projectLocalizationsForWhere.id })
              .from(projectLocalizationsForWhere)
              .where(
                drizzle.and(
                  drizzle.eq(
                    projects.id,
                    projectLocalizationsForWhere.projectId,
                  ),
                  ...andWhereProjectLocalizations,
                ),
              ),
          ),
        );
      }
    }

    const rows = await this.db
      .select(projectsSelect)
      .from(projects)
      .leftJoin(
        projectLocalizations,
        drizzle.eq(projects.id, projectLocalizations.projectId),
      )
      .where(drizzle.and(...andWhere));

    const result = _.toArray(
      _.reduce(
        rows,
        (rows, row) => {
          if (!rows[row.id]) {
            rows[row.id] = {
              ..._.omit(row, 'projectLocalizations'),
              projectLocalizations: [],
            };
          }

          if (row.projectLocalizations) {
            rows[row.id].projectLocalizations.push(row.projectLocalizations!);
          }

          return rows;
        },
        {} as Record<
          number,
          {
            id: number;
            thumbSrc: string | null;
            sort: number;
            isPublished: boolean;
            startDate: Date | null;
            endDate: Date | null;
            status: string;
            views: number;
            createdAt: Date;
            updatedAt: Date;
            projectLocalizations: Array<{
              id: number;
              slug: string;
              languageCode: string;
              title: string;
              createdAt: Date;
              updatedAt: Date;
            }>;
          }
        >,
      ),
    );

    await Promise.all(
      _.map(result, (row) => this.setProjectTemporaryLink(row)),
    );

    return result;
  }

  async getById(id: number) {
    const rows = await this.db
      .select(projectSelect)
      .from(projects)
      .leftJoin(
        projectLocalizations,
        drizzle.eq(projects.id, projectLocalizations.projectId),
      )
      .where(drizzle.eq(projects.id, id));

    if (!rows.length) {
      throw new HttpNotFound();
    }

    const result = {
      ..._.omit(rows[0], 'projectLocalizations'),
      projectLocalizations: _.compact(_.map(rows, 'projectLocalizations')),
    };

    await this.setProjectTemporaryLink(result);

    return result;
  }

  async create(dto: UpsertProjectSchema) {
    const [{ sort: lastSort } = { sort: -1 }] = await this.db
      .select({ sort: projects.sort })
      .from(projects)
      .orderBy(drizzle.desc(projects.sort))
      .limit(1);

    const sort = lastSort + 1;

    const [result] = await this.db
      .insert(projects)
      .values({
        ...dto,
        sort,
        startDate: parseDateTime(dto.startDate),
        endDate: parseDateTime(dto.endDate),
        ...this.getTimestamp('insert'),
      })
      .returning();

    return result;
  }

  async update(id: number, dto: UpsertProjectSchema) {
    const [result] = await this.db
      .update(projects)
      .set({
        ...dto,
        startDate: parseDateTime(dto.startDate),
        endDate: parseDateTime(dto.endDate),
        ...this.getTimestamp('update'),
      })
      .where(drizzle.eq(projects.id, id))
      .returning({ id: projects.id });

    return result;
  }

  async delete(id: number) {
    const [result] = await this.db
      .delete(projects)
      .where(drizzle.eq(projects.id, id))
      .returning({ id: projects.id, sort: projects.sort });

    await await this.db
      .update(projects)
      .set({
        sort: drizzle.sql`${projects.sort} - 1`,
      })
      .where(drizzle.gt(projects.sort, result.sort));

    return { id: result.id };
  }

  async getImageUploadLink(id: number, dto: { isThumb?: boolean }) {
    const [result] = await this.db
      .select({ id: projects.id, imageSrcs: projects.imageSrcs })
      .from(projects)
      .where(drizzle.eq(projects.id, id));

    if (!result) {
      throw new HttpNotFound();
    }

    const imagePath = dto.isThumb ? 'thumb.png' : `images/${uuidv4()}.png`;
    const path = `/projects/${id}/${imagePath}`;

    const link = await this.getTemporaryUploadLink({
      path,
    });

    await this.db
      .update(projects)
      .set(
        dto.isThumb
          ? { thumbSrc: path }
          : { imageSrcs: [...result.imageSrcs, path] },
      )
      .where(drizzle.eq(projects.id, id));

    return { link };
  }

  async deleteImage(id: number, dto: DeleteProjectImageSchema) {
    const [result] = await this.db
      .select({
        id: projects.id,
        thumbSrc: projects.thumbSrc,
        imageSrcs: projects.imageSrcs,
      })
      .from(projects)
      .where(drizzle.eq(projects.id, id));

    if (!result) {
      throw new HttpNotFound();
    }

    if (typeof dto.index !== 'number') {
      await this.db
        .update(projects)
        .set({
          thumbSrc: null,
        })
        .where(drizzle.eq(projects.id, id));

      await this.context.env.KV_NAMESPACE.delete(
        `DROPBOX_CACHE_TEMPORARY_LINK:${result.thumbSrc}`,
      );

      return null;
    }

    // delete by index
    result.imageSrcs.splice(dto.index, 1);

    await this.db
      .update(projects)
      .set({
        imageSrcs: result.imageSrcs,
      })
      .where(drizzle.eq(projects.id, id));

    return null;
  }

  async sortImage(id: number, dto: SortProjectImageSchema) {
    const [result] = await this.db
      .select({
        id: projects.id,
        imageSrcs: projects.imageSrcs,
      })
      .from(projects)
      .where(drizzle.eq(projects.id, id));

    if (!result) {
      throw new HttpNotFound();
    }

    const { index, mode } = dto;
    const srcs = [...result.imageSrcs];

    if (mode === 'increment') {
      if (index < srcs.length - 1) {
        const temp = srcs[index];
        srcs[index] = srcs[index + 1];
        srcs[index + 1] = temp;
      }
    } else if (mode === 'decrement') {
      if (index > 0) {
        const temp = srcs[index];
        srcs[index] = srcs[index - 1];
        srcs[index - 1] = temp;
      }
    }

    await this.db
      .update(projects)
      .set({
        imageSrcs: srcs,
      })
      .where(drizzle.eq(projects.id, id));

    return null;
  }

  async upsertLocale(
    keys: {
      projectId: number;
      languageCode: LanguageCode;
    },
    dto: UpsertProjectLocalizationSchema,
  ) {
    const { projectId, languageCode } = keys;

    const [{ id: idInDb } = { id: 0 }] = await this.db
      .select({
        id: projectLocalizations.id,
      })
      .from(projectLocalizations)
      .where(
        drizzle.and(
          drizzle.eq(projectLocalizations.projectId, projectId),
          drizzle.eq(projectLocalizations.languageCode, languageCode),
        ),
      );

    if (!idInDb) {
      const [result] = await this.db
        .insert(projectLocalizations)
        .values({
          languageCode,
          projectId,
          ...dto,
          ...this.getTimestamp('insert'),
        })
        .returning({ id: projectLocalizations.id });

      return result;
    }

    const [result] = await this.db
      .update(projectLocalizations)
      .set({
        ...dto,
        ...this.getTimestamp('update'),
      })
      .where(
        drizzle.and(
          drizzle.eq(projectLocalizations.projectId, projectId),
          drizzle.eq(projectLocalizations.languageCode, languageCode),
        ),
      )
      .returning({ id: projectLocalizations.id });

    return result;
  }

  async deleteLocale(keys: { projectId: number; languageCode: LanguageCode }) {
    const { projectId, languageCode } = keys;

    const [result] = await this.db
      .delete(projectLocalizations)
      .where(
        drizzle.and(
          drizzle.eq(projectLocalizations.projectId, projectId),
          drizzle.eq(projectLocalizations.languageCode, languageCode),
        ),
      )
      .returning({ id: projectLocalizations.id });

    return result;
  }

  async searchPublish(options: { languageCode: LanguageCode }) {
    const { languageCode } = options;

    const rows = await this.db
      .select(projectsSelect)
      .from(projects)
      .leftJoin(
        projectLocalizations,
        drizzle.eq(projects.id, projectLocalizations.projectId),
      )
      .where(
        drizzle.and(
          drizzle.eq(projects.isPublished, true),
          drizzle.eq(projectLocalizations.languageCode, languageCode),
        ),
      )
      .orderBy(drizzle.asc(projects.sort));

    const result = _.toArray(
      _.reduce(
        rows,
        (rows, row) => {
          if (!rows[row.id]) {
            rows[row.id] = {
              ..._.omit(row, 'projectLocalizations'),
              projectLocalization: row.projectLocalizations!,
            };
          }

          return rows;
        },
        {} as Record<
          number,
          {
            id: number;
            thumbSrc: string | null;
            sort: number;
            isPublished: boolean;
            startDate: Date | null;
            endDate: Date | null;
            status: string;
            views: number;
            createdAt: Date;
            updatedAt: Date;
            projectLocalization: {
              id: number;
              slug: string;
              languageCode: string;
              title: string;
              createdAt: Date;
              updatedAt: Date;
            };
          }
        >,
      ),
    );

    await Promise.all(
      _.map(result, (row) => this.setProjectTemporaryLink(row)),
    );

    return result;
  }

  async searchBySlug(options: { slug: string; languageCode: LanguageCode }) {
    const { slug, languageCode } = options;

    const [row] = await this.db
      .select(projectSelect)
      .from(projects)
      .leftJoin(
        projectLocalizations,
        drizzle.eq(projects.id, projectLocalizations.projectId),
      )
      .where(
        drizzle.and(
          drizzle.eq(projects.isPublished, true),
          drizzle.eq(projectLocalizations.languageCode, languageCode),
          drizzle.eq(projectLocalizations.slug, slug),
        ),
      )
      .limit(1);

    if (!row) {
      throw new HttpNotFound();
    }

    const result = {
      ..._.omit(row, 'projectLocalizations'),
      projectLocalization: row.projectLocalizations!,
    };

    await this.setProjectTemporaryLink(result);

    return result;
  }
}
