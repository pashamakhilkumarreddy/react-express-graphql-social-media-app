const posts = require('./posts');
const users = require('./users');

module.exports = {
  Query: {
    ...posts.Query,
  },
  Mutation: {
    ...users.Mutation,
  },
};
