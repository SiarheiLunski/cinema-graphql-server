import { Resolvers } from '../../types/schema';
import { User } from '../../entity/User';
import { Role } from '../../entity/Role';

export const resolvers: Resolvers = {
  Query: {
    getUsers: async (_, args) => {
      const users = await User.find();
      return users;
    }
  },
  User: {
    roles: async (parent) => {
      console.log(parent);
      const user = await User.findOne({
        where: { id: parent.id },
        relations: ['roles']
      });
      if (!user) return [];
      return user.roles;
    }
  }
};
