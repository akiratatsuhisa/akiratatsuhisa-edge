import { Context, HonoEnv } from 'hono';

import { ProjectsService } from './projects';
import { ResumeService } from './resume';
import { UsersService } from './users';

export { ProjectsService, ResumeService, UsersService };

export const initServices = (context: Context<HonoEnv>) => {
  return {
    users: new UsersService(context),
    resume: new ResumeService(context),
    projects: new ProjectsService(context),
  };
};

export type Services = ReturnType<typeof initServices>;
