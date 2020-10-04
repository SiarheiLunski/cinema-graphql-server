import 'reflect-metadata';
import { join } from 'path';
import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';

import { resolvers } from './resolvers';

const schema = loadSchemaSync(join(__dirname, 'schema.graphql'), {
  loaders: [
    new GraphQLFileLoader()
  ]
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const server = new ApolloServer({
  schema: schemaWithResolvers
});

createConnection().then((/* connection */) => {
  server.listen(4000);
});
