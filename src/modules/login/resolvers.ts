import { ApolloError } from 'apollo-server-express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../../entity/User';
import { Resolvers } from '../../types/schema';
import { AUTH_COOKIE_NAME } from '../../constants';
import { LOGIN_ERROR_MESSAGE, EMAIL_NOT_CONFIRMED_ERROR_MESSAGE } from '../../constants/errorMessages';

export const resolvers: Resolvers = {
  Mutation: {
    login: async (_, args, { res }) => {
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

      const token = jwt.sign({
        id: user.id
      }, process.env.JWT_SECRET_KEY!);

      res.cookie(AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      });

      return 'success';
    },
    logout: async (_, args, { res }) => {
      res.clearCookie(AUTH_COOKIE_NAME);

      return 'success';
    }
  }
};
