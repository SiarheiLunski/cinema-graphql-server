import 'reflect-metadata';
import './utils/setEnv';
import { join } from 'path';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { createConnection } from 'typeorm';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { redis } from './cache';
import { applyRoutes } from './routes';
import { getUserFromReq } from './utils/getUserFromReq';

const commonSchema = loadSchemaSync(join(__dirname, './modules/**/schema.graphql'), {
  loaders: [
    new GraphQLFileLoader()
  ]
});

const resolversArray = loadFilesSync(join(__dirname, './modules/**/resolvers.ts'));
const resolvers = mergeResolvers(resolversArray);

const schema = stitchSchemas({
  subschemas: [commonSchema]
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const server = new ApolloServer({
  schema: schemaWithResolvers, 
  debug: process.env.NODE_ENV === 'development',
  context: async ({ req, res }) => {
    const user = await getUserFromReq(req);
    return ({
      redis,
      url: `${req.protocol}://${req.get('host')}`,
      user,
      res
    });
  } 
});

const app = applyRoutes(express());
server.applyMiddleware({ app });

createConnection().then((/* connection */) => {
  app.listen({ port: 4000 });
});
