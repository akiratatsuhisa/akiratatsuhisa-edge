import { MiddlewareHandler } from 'hono';
import { createRemoteJWKSet, jwtVerify } from 'jose';

import { Bindings } from '../constants';
import { IIdentityUser } from '../interfaces';

export const authenticate: () => MiddlewareHandler<{ Bindings: Bindings }> =
  () => async (context, next) => {
    const authorizationHeader = context.req.header('authorization');

    const tokenPrefix = 'Bearer ';

    if (!authorizationHeader || !authorizationHeader.startsWith(tokenPrefix)) {
      context.set('token', null);
      context.set('user', null);

      return await next();
    }

    const jwt = authorizationHeader.slice(tokenPrefix.length);

    const JWKS = createRemoteJWKSet(
      new URL(`${context.env.AUTH0_DOMAIN}/.well-known/jwks.json`),
    );

    try {
      await jwtVerify(jwt, JWKS, {
        audience: context.env.AUTH0_AUDIENCE,
        issuer: context.env.AUTH0_ISSUER,
      });

      const response = await fetch(`${context.env.AUTH0_DOMAIN}/userinfo`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await response.json<IIdentityUser>();

      context.set('token', jwt);
      context.set('user', data);
    } catch (error) {
      console.warn(error);

      context.set('token', null);
      context.set('user', null);
    }

    await next();
  };
