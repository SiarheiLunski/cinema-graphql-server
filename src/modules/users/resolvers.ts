import { Resolvers } from '../../types/schema';
import { User } from '../../entity/User';

export const resolvers: Resolvers = {
  Query: {
    getUsers: async (_, args) => {
      const users = await User.find({
        relations: ['roles']
      });
      return users;
    }
  }
};
