import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';

import { generateSchema } from './utils/schema';

const app = express();
const PORT = process.env.PLAYGROUND_PORT || 8000;
const GRAPHQL_ENDPOINT =
  process.env.PLAYGROUND_GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql';

async function bootstrap() {
  const schema = await generateSchema();

  app.use(
    '/graphql',
    graphqlHTTP(() => ({
      schema,
    })),
  );

  app.get(
    '/',
    expressPlayground({
      endpoint: GRAPHQL_ENDPOINT,
    }),
  );

  app.listen({ port: PORT }, () => {
    console.log(`Graphql API doc ready at http://localhost:${PORT}/graphql`);
  });
}

bootstrap();
