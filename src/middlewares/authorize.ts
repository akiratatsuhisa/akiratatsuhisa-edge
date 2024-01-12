import { MiddlewareHandler } from 'hono';
import _ from 'lodash';

import { HttpForbidden, HttpUnauthorized, Role } from '../utils';

export const authorize: (requiredRoles?: Array<Role>) => MiddlewareHandler =
  (requiredRoles?: Array<string>) => async (context, next) => {
    const user = context.get('user');

    if (!user) {
      throw new HttpUnauthorized();
    }

    if (
      requiredRoles?.length &&
      !_.some(requiredRoles, (role) => _.includes(user.user_roles, role))
    ) {
      throw new HttpForbidden();
    }

    await next();
  };
