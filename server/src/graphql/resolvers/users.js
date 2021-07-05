import { UserInputError } from 'apollo-server';
import { User } from '../../models/index.js';
import { validateAuthInput } from '../../utils/validations.js';

export default {
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    async login(_, { loginInput: { email, password } }, context, info) {
      try {
        // console.info(context, info);
        const errors = validateAuthInput(email, password);
        if (Object.values(errors).length) {
          throw new UserInputError('Invalid User Input', {
            errors,
          });
        }
        const user = await User.findOne({
          email,
        });
        if (user) {
          const validUser = await user.comparePassword(password);
          if (validUser) {
            const refreshToken = await user.genRefreshToken();
            const accessToken = await user.genAccessToken();
            return {
              ...user.formattedUserObj(),
              tokens: {
                refreshToken,
                accessToken,
              },
            };
          }
          throw new UserInputError('Invalid user input', {
            errors: {
              password: 'Invalid login credentials',
            },
          });
        } else {
          throw new UserInputError('No user found', {
            errors: {
              email:
                'The provided email doesn\'t exist in our system. Please try to register',
            },
          });
        }
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async register(_, { registerInput: { email, password } }, context, info) {
      try {
        // console.info(context, info);
        const errors = validateAuthInput(email, password);
        if (Object.values(errors).length) {
          throw new UserInputError('Invalid User Input', {
            errors,
          });
        }
        const userExists = await User.findOne({
          email,
        });
        if (!userExists) {
          const newUser = new User({
            email,
            password,
          });
          const user = await newUser.save();
          const refreshToken = await newUser.genRefreshToken();
          const accessToken = await newUser.genAccessToken();
          return {
            ...user.formattedUserObj(),
            tokens: {
              refreshToken,
              accessToken,
            },
          };
        }
        throw new UserInputError('Email is already taken', {
          errors: {
            email: 'Email is already registered. Please try to login',
          },
        });
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },
  },
  Subscription: {},
};
