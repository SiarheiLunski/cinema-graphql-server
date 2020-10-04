import { Resolvers } from './types/schema';

export const resolvers: Resolvers = {
  Query: {
    hello: (_, { name }) => `Bye, ${name}`
  },
  Mutation: {
    register: (_, { email, password }) => {
      console.log(email, password);
      return true;
    }
  }
};
