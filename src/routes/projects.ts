import { Hono, HonoEnv } from 'hono';
import { validator } from 'hono/validator';
import _ from 'lodash';

import { authorize } from '../middlewares';
import {
  parseLanguageCode,
  parseQueries,
  parseQuery,
  regexId,
  regexLanguageCode,
  Role,
} from '../utils';
import {
  deleteProjectImageSchema,
  sortProjectImageSchema,
  uploadProjectImageSchema,
  upsertProjectLocalizationSchema,
  upsertProjectSchema,
  validateSchema,
} from '../validators';

export const projectsRoute = (app: Hono<HonoEnv>) => {
  const prefix = '/api/projects';

  // Admin Projects
  // Search
  app.get(
    `${prefix}`,
    authorize([Role.Administrator]),
    validator('query', (value) => {
      const title = parseQuery(value['title']);
      const client = parseQuery(value['client']);
      const status = parseQueries(value['status[]']);
      const language = parseQueries(value['language[]']);

      return { title, client, status, language };
    }),
    async (context) =>
      context.json(
        await context
          .get('services')
          .projects.getAll(context.req.valid('query')),
      ),
  );
  // Search by id
  app.get(
    `${prefix}/:id{${regexId}}`,
    authorize([Role.Administrator]),
    async (context) =>
      context.json(
        await context
          .get('services')
          .projects.getById(Number(context.req.param('id'))),
      ),
  );
  // Sort
  app.patch(
    `${prefix}/:id{${regexId}}/sort`,
    authorize([Role.Administrator]),
    async (context) => context.json(null),
  );
  // Create
  app.post(
    `${prefix}`,
    authorize([Role.Administrator]),
    validator('json', validateSchema(upsertProjectSchema)),
    async (context) =>
      context.json(
        await context
          .get('services')
          .projects.create(context.req.valid('json')),
      ),
  );
  // Update
  app.put(
    `${prefix}/:id{${regexId}}`,
    authorize([Role.Administrator]),
    validator('json', validateSchema(upsertProjectSchema)),
    async (context) =>
      context.json(
        await context
          .get('services')
          .projects.update(
            Number(context.req.param('id')),
            context.req.valid('json'),
          ),
      ),
  );
  // Delete
  app.delete(
    `${prefix}/:id{${regexId}}`,
    authorize([Role.Administrator]),
    async (context) =>
      context.json(
        await context
          .get('services')
          .projects.delete(Number(context.req.param('id'))),
      ),
  );
  // Upsert locale
  app.put(
    `${prefix}/:projectId{${regexId}}/locale/:languageCode{${regexLanguageCode}}`,
    authorize([Role.Administrator]),
    validator('json', validateSchema(upsertProjectLocalizationSchema)),
    async (context) =>
      context.json(
        await context.get('services').projects.upsertLocale(
          {
            projectId: Number(context.req.param('projectId')),
            languageCode: parseLanguageCode(context.req.param('languageCode')),
          },
          context.req.valid('json'),
        ),
      ),
  );
  // Delete locale
  app.delete(
    `${prefix}/:projectId{${regexId}}/locale/:languageCode{${regexLanguageCode}}`,
    authorize([Role.Administrator]),
    async (context) =>
      context.json(
        await context.get('services').projects.deleteLocale({
          projectId: Number(context.req.param('projectId')),
          languageCode: parseLanguageCode(context.req.param('languageCode')),
        }),
      ),
  );
  // Upload Image
  app.post(
    `${prefix}/:id{${regexId}}/image`,
    authorize([Role.Administrator]),
    validator('json', validateSchema(uploadProjectImageSchema)),
    async (context) =>
      context.json(
        await context
          .get('services')
          .projects.getImageUploadLink(
            Number(context.req.param('id')),
            context.req.valid('json'),
          ),
      ),
  );
  // Delete Image
  app.delete(
    `${prefix}/:id{${regexId}}/image`,
    authorize([Role.Administrator]),
    validator('json', validateSchema(deleteProjectImageSchema)),
    async (context) =>
      context.json(
        await context
          .get('services')
          .projects.deleteImage(
            Number(context.req.param('id')),
            context.req.valid('json'),
          ),
      ),
  );
  // Sort Image
  app.patch(
    `${prefix}/:id{${regexId}}/image`,
    authorize([Role.Administrator]),
    validator('json', validateSchema(sortProjectImageSchema)),
    async (context) =>
      context.json(
        await context
          .get('services')
          .projects.sortImage(
            Number(context.req.param('id')),
            context.req.valid('json'),
          ),
      ),
  );

  // Guest
  // Search publish
  app.get(
    `${prefix}/publish/locale/:languageCode{${regexLanguageCode}}`,
    async (context) =>
      context.json(
        await context.get('services').projects.searchPublish({
          languageCode: parseLanguageCode(context.req.param('languageCode')),
        }),
      ),
  );
  // Search by slug
  app.get(
    `${prefix}/slug/:slug/locale/:languageCode{${regexLanguageCode}}`,
    async (context) =>
      context.json(
        await context.get('services').projects.searchBySlug({
          slug: context.req.param('slug'),
          languageCode: parseLanguageCode(context.req.param('languageCode')),
        }),
      ),
  );
};
