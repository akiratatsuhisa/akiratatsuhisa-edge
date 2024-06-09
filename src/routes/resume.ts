import { Hono, HonoEnv } from 'hono';
import { validator } from 'hono/validator';

import { authorize } from '../middlewares';
import { Role } from '../utils';
import {
  paginationSchema,
  resumeContactSchema,
  validateSchema,
} from '../validators';

export const resumeRoute = (app: Hono<HonoEnv>) => {
  const prefix = '/api/resume';

  app.get(
    `${prefix}/contact`,
    authorize([Role.Administrator]),
    validator('query', validateSchema(paginationSchema)),
    async (context) => {
      const { result, count } = await context
        .get('services')
        .resume.searchContact(context.req.valid('query'));

      context.header('X-Total', count.toString());
      return context.json(result);
    },
  );

  app.post(
    `${prefix}/contact`,
    validator('json', validateSchema(resumeContactSchema)),
    async (context) =>
      context.json(
        await context
          .get('services')
          .resume.sendContact(
            context.req.valid('json'),
            context.req.header('x-real-ip') ??
              context.req.header('cf-connecting-ip'),
          ),
      ),
  );

  app.delete(
    `${prefix}/contact/:id`,
    authorize([Role.Administrator]),
    async (context) =>
      context.json(
        await context
          .get('services')
          .resume.cancelContact(Number(context.req.param('id'))),
      ),
  );
};
