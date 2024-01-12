import { Context, HonoEnv } from 'hono';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import {
  LanguageCode,
  Prisma,
  ProjectStatus,
} from '../../generated/client/edge';
import { HttpNotFound, parseDateTime } from '../utils';
import {
  DeleteProjectImageSchema,
  SortProjectImageSchema,
  UpsertProjectLocalizationSchema,
  UpsertProjectSchema,
} from '../validators';
import { BaseService } from './base';

const projectsSelect = Prisma.validator<Prisma.ProjectSelect>()({
  id: true,
  thumbSrc: true,
  sort: true,
  isPublished: true,
  startDate: true,
  endDate: true,
  status: true,
  views: true,
  createdAt: true,
  updatedAt: true,
  projectLocalizations: {
    select: {
      id: true,
      slug: true,
      languageCode: true,
      title: true,
      createdAt: true,
      updatedAt: true,
    },
  },
});

const projectSelect = Prisma.validator<Prisma.ProjectSelect>()({
  id: true,
  thumbSrc: true,
  sort: true,
  isPublished: true,
  startDate: true,
  endDate: true,
  status: true,
  imageSrcs: true,
  languages: true,
  frameworks: true,
  databases: true,
  technologies: true,
  others: true,
  views: true,
  projectLocalizations: {
    select: {
      id: true,
      slug: true,
      languageCode: true,
      title: true,
      description: true,
      client: true,
      website: true,
      source: true,
      createdAt: true,
      updatedAt: true,
    },
  },
});

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
    const andWhere: Prisma.ProjectWhereInput[] = [];

    if (query.title) {
      andWhere.push({
        projectLocalizations: { some: { title: { contains: query.title } } },
      });
    }

    if (query.client) {
      andWhere.push({
        projectLocalizations: { some: { client: { contains: query.client } } },
      });
    }

    if (query.status) {
      andWhere.push({
        status: { in: query.status },
      });
    }

    if (query.language) {
      andWhere.push({
        projectLocalizations: {
          some: { languageCode: { in: query.language } },
        },
      });
    }

    const projects = await this.prisma.project.findMany({
      select: projectsSelect,
      where: { AND: andWhere },
      orderBy: { sort: 'asc' },
    });

    await Promise.all(
      _.map(projects, (project) => this.setProjectTemporaryLink(project)),
    );

    return projects;
  }

  async getById(id: string) {
    const project = await this.prisma.project.findUnique({
      select: projectSelect,
      where: { id },
    });

    if (!project) {
      throw new HttpNotFound();
    }

    await this.setProjectTemporaryLink(project);

    return project;
  }

  async create(dto: UpsertProjectSchema) {
    const sort =
      ((
        await this.prisma.project.findFirst({
          select: { sort: true },
          orderBy: { sort: 'desc' },
        })
      )?.sort ?? 0) + 1;

    const project = await this.prisma.project.create({
      data: {
        ...dto,
        startDate: parseDateTime(dto.startDate),
        endDate: parseDateTime(dto.endDate),
        sort,
      },
      select: {
        id: true,
      },
    });

    return project;
  }

  async update(id: string, dto: UpsertProjectSchema) {
    const project = await this.prisma.project.update({
      where: { id },
      data: {
        ...dto,
        startDate: parseDateTime(dto.startDate),
        endDate: parseDateTime(dto.endDate),
      },
      select: {
        id: true,
      },
    });

    return project;
  }

  async delete(id: string) {
    const project = await this.prisma.project.delete({
      where: { id },
      select: {
        id: true,
        sort: true,
      },
    });

    await this.prisma.project.updateMany({
      where: {
        sort: { gt: project.sort },
      },
      data: {
        sort: { decrement: 1 },
      },
    });

    return { id: project.id };
  }

  async getImageUploadLink(id: string, dto: { isThumb?: boolean }) {
    const imagePath = dto.isThumb ? 'thumb.png' : `images/${uuidv4()}.png`;
    const path = `/projects/${id}/${imagePath}`;

    const link = await this.getTemporaryUploadLink({
      path,
    });

    await this.prisma.project.update({
      where: { id },
      data: dto.isThumb
        ? {
            thumbSrc: path,
          }
        : {
            imageSrcs: { push: path },
          },
    });

    return { link };
  }

  async deleteImage(id: string, dto: DeleteProjectImageSchema) {
    const project = await this.prisma.project
      .findUniqueOrThrow({
        where: { id },
        select: { id: true, thumbSrc: true, imageSrcs: true },
      })
      .catch(() => Promise.reject(new HttpNotFound()));

    if (typeof dto.index !== 'number') {
      await this.prisma.project.update({
        where: { id },
        data: { thumbSrc: null },
      });

      await this.context.env.KV_NAMESPACE.delete(
        `DROPBOX_CACHE_TEMPORARY_LINK:${project.thumbSrc}`,
      );

      return null;
    }

    // delete by index
    project.imageSrcs.splice(dto.index, 1);

    await this.prisma.project.update({
      where: { id },
      data: {
        imageSrcs: project.imageSrcs,
      },
    });

    return null;
  }

  async sortImage(id: string, dto: SortProjectImageSchema) {
    const project = await this.prisma.project
      .findUniqueOrThrow({
        where: { id },
        select: { id: true, imageSrcs: true },
      })
      .catch(() => Promise.reject(new HttpNotFound()));

    const { index, mode } = dto;
    const srcs = [...project.imageSrcs];

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

    await this.prisma.project.update({
      where: { id },
      data: { imageSrcs: srcs },
    });

    return null;
  }

  async upsertLocale(
    options: {
      projectId: string;
      languageCode: LanguageCode;
    },
    dto: UpsertProjectLocalizationSchema,
  ) {
    const { projectId, languageCode } = options;

    const project = await this.prisma.projectLocalization.upsert({
      where: {
        projectId_languageCode: { projectId, languageCode },
      },
      create: {
        languageCode,
        ...dto,
        project: { connect: { id: projectId } },
      },
      update: dto,
      select: {
        id: true,
        languageCode: true,
      },
    });

    return project;
  }

  async deleteLocale(options: {
    projectId: string;
    languageCode: LanguageCode;
  }) {
    const { projectId, languageCode } = options;

    const project = await this.prisma.projectLocalization.delete({
      where: {
        projectId_languageCode: { projectId, languageCode },
      },
    });

    return project;
  }

  async searchPublish(options: { languageCode: LanguageCode }) {
    const { languageCode } = options;

    const projects = await this.prisma.project.findMany({
      select: {
        ...projectsSelect,
        projectLocalizations: {
          select: projectsSelect.projectLocalizations.select,
          where: {
            languageCode: languageCode as LanguageCode,
          },
        },
      },
      where: {
        isPublished: true,
        projectLocalizations: {
          some: { languageCode: languageCode as LanguageCode },
        },
      },
      orderBy: { sort: 'asc' },
    });

    await Promise.all(
      _.map(projects, (project) => this.setProjectTemporaryLink(project)),
    );

    return projects;
  }

  async searchBySlug(options: { slug: string; languageCode: LanguageCode }) {
    const { slug, languageCode } = options;

    const project = await this.prisma.project.findFirst({
      select: {
        ...projectSelect,
        projectLocalizations: {
          select: projectSelect.projectLocalizations.select,
          where: {
            languageCode: languageCode as LanguageCode,
          },
        },
      },
      where: {
        isPublished: true,
        projectLocalizations: {
          some: {
            slug: slug,
            languageCode: languageCode as LanguageCode,
          },
        },
      },
    });

    if (!project) {
      throw new HttpNotFound();
    }

    await this.setProjectTemporaryLink(project);

    return project;
  }
}
