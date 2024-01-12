export type Bindings = {
  DATABASE_URL: string;
  KV_NAMESPACE: KVNamespace;

  AUTH0_DOMAIN: string;
  AUTH0_AUDIENCE: string;
  AUTH0_ISSUER: string;

  AUTH_MANAGEMENT_URL_TOKEN: string;
  AUTH_MANAGEMENT_CLIENT_ID: string;
  AUTH_MANAGEMENT_CLIENT_SECRET: string;
  AUTH_MANAGEMENT_URL: string;
};
