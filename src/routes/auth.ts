import { Hono, HonoEnv } from 'hono';

import { authorize } from '../middlewares';

export const authRoute = (app: Hono<HonoEnv>) => {
  const prefix = '/api';

  app.get(`${prefix}/user`, authorize(), async (context) =>
    context.json(await context.get('user')),
  );
};
