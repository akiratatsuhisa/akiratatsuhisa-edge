import { withAccelerate } from '@prisma/extension-accelerate';

import { PrismaClient } from '../generated/client/edge';

export const getExtendedClient = (url: string) => {
  const client = new PrismaClient({
    datasourceUrl: url,
  }).$extends(withAccelerate());

  return client;
};

export type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>;
