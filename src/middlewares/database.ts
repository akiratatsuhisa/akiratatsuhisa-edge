import { drizzle } from 'drizzle-orm/d1';
import { MiddlewareHandler } from 'hono';

export const database: () => MiddlewareHandler =
  () => async (context, next) => {
    const db = drizzle(context.env.DB);

    context.set('db', db);

    await next();
  };
