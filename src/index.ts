import 'reflect-metadata';
import { join } from 'path';
import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const registerSchema = loadSchemaSync(join(__dirname, './modules/register/schema.graphql'), {
  loaders: [
    new GraphQLFileLoader()
  ]
});
const helloWorldSchema = loadSchemaSync(join(__dirname, './modules/tmp/schema.graphql'), {
  loaders: [
    new GraphQLFileLoader()
  ]
});

const resolversArray = loadFilesSync(join(__dirname, './modules/**/resolvers.ts'));
const resolvers = mergeResolvers(resolversArray);

const schema = stitchSchemas({
  subschemas: [
    registerSchema,
    helloWorldSchema
  ]
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const server = new ApolloServer({
  schema: schemaWithResolvers, 
  debug: process.env.NODE_ENV === 'development'
});

createConnection().then((/* connection */) => {
  server.listen(4000);
});
