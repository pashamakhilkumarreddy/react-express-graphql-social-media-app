const { User } = require('../../models');

module.exports = {
  Mutation: {
    async register(_, {input: {email, password}}, context, info) { // eslint-disable-line
      const userExists = await User.findOne({
        email,
      });
      if (!userExists) {
        const user = new User({
          email,
          password,
        });
        const newUser = await user.save();
        const tokens = {
          refreshToken: await newUser.genRefreshToken(),
          accessToken: await newUser.genAccessToken(),
        };
        return {
          user: {
            ...newUser._doc,
          },
          tokens,
        };
      }
      return {
        message: 'User already exists',
      };
    },
  },
};
