import { Hono } from 'hono';
import _ from 'lodash';

import { Bindings } from '../constants';
import { HttpNotFound } from '../helpers';
import { authorize } from '../middlewares';

export const usersRoute = (app: Hono<{ Bindings: Bindings }>) => {
  const prefix = '/api/users';

  app.get(`${prefix}`, authorize(['Administrator']), async (context) => {
    const token = await context.get('getManagementToken')();

    const url = new URL(`${context.env.AUTH_MANAGEMENT_URL}/users`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return context.json(data);
  });

  app.get(`${prefix}/:nickname`, async (context) => {
    const nickname = context.req.param('nickname');

    if (!/^[a-zA-Z0-9_+\-.!#$'^`~@]+$/.test(nickname)) {
      throw new HttpNotFound();
    }

    const token = await context.get('getManagementToken')();

    const url = new URL(`${context.env.AUTH_MANAGEMENT_URL}/users`);
    url.searchParams.set('per_page', '1');
    url.searchParams.set('q', `nickname="${nickname}"`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json<Array<any>>();

    if (!data.length) {
      throw new HttpNotFound();
    }

    return context.json(
      _(data)
        .map((data) =>
          _(data)
            .pick([
              'nickname',
              'name',
              'family_name',
              'given_name',
              'email',
              'picture',
            ])
            .mapKeys((_value, key) => _.camelCase(key)),
        )
        .first(),
    );
  });
};
