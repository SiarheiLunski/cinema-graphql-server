import { Request } from 'express';
import { ApolloError } from 'apollo-server-express';
import * as jwt from 'jsonwebtoken';
import { AUTH_COOKIE_NAME } from '../constants';
import { EMAIL_NOT_CONFIRMED_ERROR_MESSAGE } from '../constants/errorMessages';
import { User } from '../entity/User';
import { UserAuthenticated, JWTPayload } from '../types';

export async function getUserFromReq(req: Request): Promise<UserAuthenticated | null> {
  const token = req?.cookies?.[AUTH_COOKIE_NAME] || req?.headers?.authorization;
  if (!token) return null;

  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JWTPayload;
  if (id) {
    const user = await User.findOne({
      select: ['id', 'email', 'confirmed'],
      where: { id }
    });

    if (user) { 
      if (!user.confirmed) {
        throw new ApolloError(EMAIL_NOT_CONFIRMED_ERROR_MESSAGE);
      }

      return user;
    }
  }

  return null;
}
