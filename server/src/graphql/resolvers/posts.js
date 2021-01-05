const { Post } = require('../../models');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find({});
        const a = {
          _id: 1233,
          userId: 1233,
          content: 'String!',
          createdAt: 'String!',
        };
        return [a, ...posts];
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },
  },

};
