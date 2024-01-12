import { HonoEnv, MiddlewareHandler } from 'hono';

import { initServices } from '../services';

export const services: () => MiddlewareHandler<HonoEnv> =
  () => async (context, next) => {
    const services = initServices(context);

    context.set('services', services);

    await next();
  };
