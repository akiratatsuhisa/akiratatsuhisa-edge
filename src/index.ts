import './utils/yup';

import { Hono, HonoEnv } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { prettyJSON } from 'hono/pretty-json';

import { authenticate, database, services, setup } from './middlewares';
import { authRoute, projectsRoute, resumeRoute, usersRoute } from './routes';
import { scheduled } from './scheduled';
import { HttpBadDto } from './utils';

const app = new Hono<HonoEnv>();

// config
app.use('*', prettyJSON());
app.use('*', cors({ origin: '*', exposeHeaders: ['X-Total'] }));
app.use('*', setup());
app.use('*', database());
app.use('*', services());
app.use('*', authenticate());

app.notFound((context) => {
  context.status(404);
  return context.json({
    message: 'Not Found',
  });
});

app.onError((error, context) => {
  if (error instanceof HTTPException) {
    // Get the custom response
    context.status(error.status);
    return context.json({
      message: error.message,
      errors: error instanceof HttpBadDto ? error.errors : undefined,
    });
  }

  console.error(error);

  context.status(500);
  return context.json({
    message: 'Internal Server Error',
  });
});

// ping route
app.get('/', (context) => {
  return context.json({
    message: 'ping',
  });
});

resumeRoute(app);
authRoute(app);
projectsRoute(app);
usersRoute(app);

export default {
  fetch: app.fetch,
  scheduled,
};
