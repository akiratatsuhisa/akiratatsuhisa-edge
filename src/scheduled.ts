import type {
  ExecutionContext,
  Request as WorkerRequest,
} from '@cloudflare/workers-types/experimental';
import { withAccelerate } from '@prisma/extension-accelerate';

import { PrismaClient } from '../generated/client/edge';
import { Bindings } from './constants';

export const scheduled = async (
  _request: WorkerRequest,
  env: Bindings,
  _ctx: ExecutionContext,
) => {
  new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log('cron processed');
};
