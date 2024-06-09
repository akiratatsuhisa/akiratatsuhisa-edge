export type Bindings = {
  DATABASE_URL: string;
  KV_NAMESPACE: KVNamespace;
  DB: D1Database;
  AI: Ai;

  AUTH0_DOMAIN: string;
  AUTH0_AUDIENCE: string;
  AUTH0_ISSUER: string;

  AUTH_OAUTH2_URL_TOKEN: string;
  AUTH_MANAGEMENT_CLIENT_ID: string;
  AUTH_MANAGEMENT_CLIENT_SECRET: string;
  AUTH_MANAGEMENT_URL: string;

  DROPBOX_OAUTH2_URL_TOKEN: string;
  DROPBOX_CLIENT_ID: string;
  DROPBOX_CLIENT_SECRET: string;
  DROPBOX_REFRESH_TOKEN: string;
};
