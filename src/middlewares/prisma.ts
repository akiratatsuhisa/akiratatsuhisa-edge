import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { MiddlewareHandler } from 'hono';

export const prisma: () => MiddlewareHandler = () => async (context, next) => {
  const prismaClinet = new PrismaClient({
    datasourceUrl:
      typeof context === 'string' ? context : context.env.DATABASE_URL,
  }).$extends(withAccelerate());

  context.set('prisma', prismaClinet);

  await next();
};
