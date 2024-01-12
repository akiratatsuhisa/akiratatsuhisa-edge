import { Hono } from 'hono';

import { Bindings } from '../constants';
import { HttpNotFound } from '../helpers';

export const logsRoute = (app: Hono<{ Bindings: Bindings }>) => {
  const prefix = '/api/logs';

  app.get(`${prefix}`, async (context) => {
    const prisma = context.get('prisma');

    const result = await prisma.log.findMany();

    return context.json(result);
  });

  app.get(`'${prefix}/:id`, async (context) => {
    const id = context.req.param('id');

    const prisma = context.get('prisma');

    const result = await prisma.log
      .findUniqueOrThrow({ where: { id } })
      .catch((error) => {
        console.error(error);
        throw new HttpNotFound('Log', id);
      });

    return context.json(result);
  });
};
