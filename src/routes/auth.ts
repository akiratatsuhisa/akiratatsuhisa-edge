import { Hono } from 'hono';

import { Bindings } from '../constants';
import { authorize } from '../middlewares';

export const authRoute = (app: Hono<{ Bindings: Bindings }>) => {
  const prefix = '/api';

  app.get(`${prefix}/user`, authorize(), async (context) => {
    return context.json(context.get('user'));
  });
};
