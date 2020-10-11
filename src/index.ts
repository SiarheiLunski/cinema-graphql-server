import 'reflect-metadata';
import './utils/setEnv';
import { join } from 'path';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { createConnection, In } from 'typeorm';
import * as DataLoader from 'dataloader';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { redis } from './cache';
import { applyRoutes } from './routes';
import { getUserFromReq } from './utils/getUserFromReq';
import { User } from './entity/User';
import { Role } from './entity/Role';

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
      res,
      rolesLoader: new DataLoader(async (keys: string[]) => {
        const users = await User.find({
          where: { id: In(keys)},
          relations: ['roles']
        });

        return users.map(user => user.roles);
      }),
      operationsLoader: new DataLoader(async (keys: number[]) => {
        const roles = await Role.find({
          where: { id: In(keys) },
          relations: ['operations']
        });

        return roles.map(role => role.operations);
      })
    });
  } 
});

const app = applyRoutes(express());
server.applyMiddleware({ app });

createConnection().then((/* connection */) => {
  app.listen({ port: 4000 });
});
