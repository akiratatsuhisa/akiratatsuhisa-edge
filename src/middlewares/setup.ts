import { HonoEnv, MiddlewareHandler } from 'hono';

const AUTH0_MANAGEMENT_TOKEN = 'AUTH0_MANAGEMENT_TOKEN';
const DROPBOX_MANAGEMENT_TOKEN = 'DROPBOX_MANAGEMENT_TOKEN';

export const setup: () => MiddlewareHandler<HonoEnv> =
  () => async (context, next) => {
    const getAuth0ManagementToken = async (): Promise<string> => {
      const cache = await context.env.KV_NAMESPACE.get(AUTH0_MANAGEMENT_TOKEN);

      if (cache) {
        return cache;
      }

      const response = await fetch(context.env.AUTH_OAUTH2_URL_TOKEN, {
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

      const data = (await response.json()) as {
        access_token: string;
        expires_in?: number;
        token_type: string;
      };

      await context.env.KV_NAMESPACE.put(
        AUTH0_MANAGEMENT_TOKEN,
        data.access_token,
        {
          expirationTtl: data.expires_in ?? 86400,
        },
      );

      return data.access_token;
    };

    context.set('getAuth0ManagementToken', getAuth0ManagementToken);

    const getDropboxManagementToken = async (): Promise<string> => {
      const cache = await context.env.KV_NAMESPACE.get(
        DROPBOX_MANAGEMENT_TOKEN,
      );

      if (cache) {
        return cache;
      }

      const authBase64 = btoa(
        `${context.env.DROPBOX_CLIENT_ID}:${context.env.DROPBOX_CLIENT_SECRET}`,
      );

      const response = await fetch(context.env.DROPBOX_OAUTH2_URL_TOKEN, {
        headers: {
          Authorization: `Basic ${authBase64}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: new URLSearchParams({
          refresh_token: context.env.DROPBOX_REFRESH_TOKEN,
          grant_type: 'refresh_token',
          scope:
            'account_info.read account_info.write contacts.read contacts.write file_requests.read file_requests.write files.content.read files.content.write files.metadata.read files.metadata.write sharing.read sharing.write',
        }),
      });

      const data = (await response.json()) as {
        access_token: string;
        expires_in?: number;
        token_type: string;
      };

      await context.env.KV_NAMESPACE.put(
        DROPBOX_MANAGEMENT_TOKEN,
        data.access_token,
        {
          expirationTtl: data.expires_in ?? 14400,
        },
      );

      return data.access_token;
    };

    context.set('getDropboxManagementToken', getDropboxManagementToken);

    await next();
  };
