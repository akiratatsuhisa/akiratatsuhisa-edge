import { PrismaClient } from '@prisma/client/edge';

import { IIdentityUser } from '../interfaces';

declare module 'hono' {
  interface ContextVariableMap {
    prisma: PrismaClient;
    token: string | null;
    user: IIdentityUser | null;
    getManagementToken: () => Promise<string>;
  }
}
