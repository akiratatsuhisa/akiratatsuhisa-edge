import { MiddlewareHandler } from 'hono';

import { HttpForbidden, HttpUnauthorized } from '../helpers';

export const authorize: (requiredRoles?: Array<string>) => MiddlewareHandler =
  (requiredRoles?: Array<string>) => async (context, next) => {
    const user = context.get('user');

    if (!user) {
      throw new HttpUnauthorized();
    }

    if (
      requiredRoles?.length &&
      !requiredRoles.some((role) => user.user_roles.includes(role))
    ) {
      throw new HttpForbidden();
    }

    await next();
  };
