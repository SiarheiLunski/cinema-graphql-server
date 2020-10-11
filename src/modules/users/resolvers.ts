import { Resolvers } from '../../types/schema';
import { User } from '../../entity/User';

export const resolvers: Resolvers = {
  Query: {
    getUsers: async (_, args) => {
      const users = await User.find();
      return users;
    }
  },
  User: {
    roles: async (parent, _, ctx) => {
      return ctx.rolesLoader.load(parent.id);
    }
  },
  Role: {
    operations: async (parent, _, ctx) => {
      return ctx.operationsLoader.load(parent.id);
    }
  }
};
