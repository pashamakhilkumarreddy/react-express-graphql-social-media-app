import postsResolvers from './posts.js';
import usersResolvers from './users.js';

export default {
  Query: {
    ...postsResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...postsResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
};
