export interface IIdentityUser {
  sub: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  user_metadata: Record<string, any>;
  app_metadata: Record<string, any>;
  user_roles: Array<string>;
}
