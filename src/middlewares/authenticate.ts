import { Context, HonoEnv, MiddlewareHandler } from 'hono';
import { createRemoteJWKSet, JWTPayload, jwtVerify } from 'jose';

import { IIdentityUser } from '../interfaces';

const AUTH0_USER_INFO = 'AUTH0_USER_INFO';

const getUserInfo = async ({
  context,
  jwt,
  payload,
}: {
  context: Context<HonoEnv>;
  jwt: string;
  payload: JWTPayload;
}): Promise<IIdentityUser> => {
  const key = `${AUTH0_USER_INFO}:${jwt.split('.').at(2)}`;
  const cache = await context.env.KV_NAMESPACE.get(key);

  if (cache) {
    console.info('Get cache userInfo:', key);
    return JSON.parse(cache) as IIdentityUser;
  }

  const response = await fetch(`${context.env.AUTH0_DOMAIN}/userinfo`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const data = (await response.json()) as IIdentityUser;

  await context.env.KV_NAMESPACE.put(key, JSON.stringify(data), {
    expiration: payload.exp,
  });

  console.info('Set cache userInfo:', key);
  return data;
};

export const authenticate: () => MiddlewareHandler<HonoEnv> =
  () => async (context, next) => {
    context.set('token', null);
    context.set('user', null);

    const authorizationHeader = context.req.header('authorization');

    const tokenPrefix = 'Bearer ';

    if (!authorizationHeader || !authorizationHeader.startsWith(tokenPrefix)) {
      return await next();
    }

    const jwt = authorizationHeader.slice(tokenPrefix.length);

    const JWKS = createRemoteJWKSet(
      new URL(`${context.env.AUTH0_DOMAIN}/.well-known/jwks.json`),
    );

    try {
      const { payload } = await jwtVerify(jwt, JWKS, {
        audience: context.env.AUTH0_AUDIENCE,
        issuer: context.env.AUTH0_ISSUER,
      });

      const userInfo = await getUserInfo({ context, jwt, payload });

      context.set('token', jwt);
      context.set('user', userInfo);
    } catch (error) {
      console.warn(error);
    }

    await next();
  };
