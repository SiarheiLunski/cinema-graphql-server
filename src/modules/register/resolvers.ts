import * as bcrypt from 'bcrypt';
import * as yup from 'yup';
import { ApolloError, UserInputError } from 'apollo-server-express';
import { Resolvers } from '../../types/schema';
import { User } from '../../entity/User';
import { formatYupError } from '../../utils/messages';
import { createConfirmEmailLink } from '../../utils/emailConfirmation';

const schema = yup.object().shape({
  email: yup.string().min(3).max(255).email(),
  password: yup.string().min(3).max(255)
});

export const resolvers: Resolvers = {
  Mutation: {
    register: async (_, args, { redis, url }) => {
      try {
        await schema.validate(args, { abortEarly: false });
        const { email, password } = args;
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
        const link = await createConfirmEmailLink(url, user.id, redis);

        return true;
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          throw new UserInputError('Input validation error', { 
            invalidArgs: formatYupError(err) 
          });
        }
        throw err;
      }
    }
  }
};
