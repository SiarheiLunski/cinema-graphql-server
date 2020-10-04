import * as bcrypt from 'bcrypt';
import { ApolloError } from 'apollo-server';
import { Resolvers } from '../../types/schema';
import { User } from '../../entity/User';

export const resolvers: Resolvers = {
  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await User.findOne({
        where: { email },
        select: ['id']
      }, );
      if (existingUser) {
        throw new ApolloError('User already exists');
      }
      const user = User.create({ email, password: hashedPassword });
      await user.save();
      return true;
    }
  }
};
