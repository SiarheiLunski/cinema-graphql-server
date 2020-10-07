import { ApolloError } from 'apollo-server-express';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { Resolvers } from '../../types/schema';
import { LOGIN_ERROR_MESSAGE, EMAIL_NOT_CONFIRMED_ERROR_MESSAGE } from '../../constants/errorMessages';

export const resolvers: Resolvers = {
  Mutation: {
    login: async (_, args) => {
      const { email, password } = args;
      const user = await User.findOne({
        where: { email }
      });
        
      if (!user) {
        throw new ApolloError(LOGIN_ERROR_MESSAGE);
      }

      if (!user.confirmed) {
        throw new ApolloError(EMAIL_NOT_CONFIRMED_ERROR_MESSAGE);
      }
      
      const matchPass = await bcrypt.compare(password, user.password);
      if (!matchPass) {
        throw new ApolloError(LOGIN_ERROR_MESSAGE);
      }

      return 'success';
    }
  }
};
