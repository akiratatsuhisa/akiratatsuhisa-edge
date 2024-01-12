import { MiddlewareHandler } from 'hono';

import { Bindings } from '../constants';

export const setup: () => MiddlewareHandler<{ Bindings: Bindings }> =
  () => async (context, next) => {
    async function getManagementToken() {
      await context.env.KV_NAMESPACE.delete('MANAGEMENT_TOKEN');
      const cache = await context.env.KV_NAMESPACE.get('MANAGEMENT_TOKEN');

      if (cache) {
        return cache;
      }

      const response = await fetch(context.env.AUTH_MANAGEMENT_URL_TOKEN, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          audience: context.env.AUTH_MANAGEMENT_URL + '/',
          client_id: context.env.AUTH_MANAGEMENT_CLIENT_ID,
          client_secret: context.env.AUTH_MANAGEMENT_CLIENT_SECRET,
          grant_type: 'client_credentials',
        }),
      });

      const data = await response.json<{
        access_token: string;
        expires_in?: number;
        token_type: string;
      }>();

      await context.env.KV_NAMESPACE.put(
        'MANAGEMENT_TOKEN',
        data.access_token,
        {
          expirationTtl: 80000,
        },
      );

      return data.access_token;
    }

    context.set('getManagementToken', getManagementToken);

    await next();
  };
