import type {
  ExecutionContext,
  Request as WorkerRequest,
} from '@cloudflare/workers-types/experimental';

import { Bindings } from './constants';

export const scheduled = async (
  _request: WorkerRequest,
  _env: Bindings,
  _ctx: ExecutionContext,
) => {
  console.log('cron processed');
};
