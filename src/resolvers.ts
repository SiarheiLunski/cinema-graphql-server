import * as bcrypt from 'bcrypt';
import { Resolvers } from './types/schema';
import { User } from './entity/User';

export const resolvers: Resolvers = {
  Query: {
    hello: (_, { name }) => `Bye, ${name}`
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({ email, password: hashedPassword });
      await user.save();
      return true;
    }
  }
};
