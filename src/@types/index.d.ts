import { drizzle } from 'drizzle-orm/d1';
import { Flags, Message, Schema } from 'yup';

import { Bindings } from '../constants';
import { IIdentityUser } from '../interfaces';
import { Services } from '../services';

declare module 'hono' {
  interface ContextVariableMap {
    db: ReturnType<typeof drizzle>;
    token: string | null;
    user: IIdentityUser | null;
    getAuth0ManagementToken: () => Promise<string>;
    getDropboxManagementToken: () => Promise<string>;
    services: Services;
  }

  interface HonoEnv {
    Bindings: Bindings;
  }
}

declare module 'yup' {
  interface ArraySchema<
    TIn extends any[] | null | undefined,
    TContext,
    TDefault = undefined,
    TFlags extends Flags = '',
  > extends Schema<TIn, TContext, TDefault, TFlags> {
    unique(msg?: Message): ArraySchema<TIn, TContext, TDefault, TFlags>;
  }
}

export {};
