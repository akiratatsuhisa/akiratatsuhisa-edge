import { MiddlewareHandler } from 'hono';

import { getExtendedClient } from '../db';

export const prisma: () => MiddlewareHandler = () => async (context, next) => {
  const prisma = getExtendedClient(
    typeof context === 'string' ? context : context.env.DATABASE_URL,
  );

  context.set('prisma', prisma);

  await next();
};
