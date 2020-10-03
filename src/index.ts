import 'reflect-metadata';
import { join } from 'path';
// import { createConnection } from 'typeorm';
// import { User } from './entity/User';

// import { ApolloServer } from 'apollo-server';
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
console.log(schemaWithResolvers);

// const server = new ApolloServer({
  
// });
