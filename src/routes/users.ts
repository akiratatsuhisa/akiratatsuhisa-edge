import { Hono, HonoEnv } from 'hono';
import _ from 'lodash';

import { authorize } from '../middlewares';
import { Role } from '../utils';

export const usersRoute = (app: Hono<HonoEnv>) => {
  const prefix = '/api/users';

  app.get(`${prefix}`, authorize([Role.Administrator]), async (context) => {
    const services = context.get('services');

    const result = await services.users.getAll();
    return context.json(result);
  });

  app.get(`${prefix}/:nickname`, async (context) => {
    const nickname = context.req.param('nickname');

    const services = context.get('services');

    const result = await services.users.getByNickName({ nickname });
    return context.json(result);
  });
};
