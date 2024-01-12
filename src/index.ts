import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { prettyJSON } from 'hono/pretty-json';

import { Bindings } from './constants';
import { authenticate, prisma, setup } from './middlewares';
import { authRoute, logsRoute, usersRoute } from './routes';
import { scheduled } from './scheduled';

const app = new Hono<{ Bindings: Bindings }>();

// config
app.use('*', prettyJSON());
app.use('*', cors());
app.use('*', setup());
app.use('*', prisma());
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
    });
  }

  console.log(error);

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

authRoute(app);
usersRoute(app);
logsRoute(app);

export default {
  fetch: app.fetch,
  scheduled,
};
