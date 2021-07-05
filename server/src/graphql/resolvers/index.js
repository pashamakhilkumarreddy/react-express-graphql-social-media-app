import postsResolvers from './posts.js';
import usersResolvers from './users.js';
import commentsResolvers from './comments.js';
import likesResolvers from './likes.js';

export default {
  Post: {
    likeCount(parent) {
      return parent.likes.length;
    },
    commentCount(parent) {
      return parent.comments.length;
    },
  },
  Query: {
    ...postsResolvers.Query,
    ...usersResolvers.Query,
    ...commentsResolvers.Query,
    ...likesResolvers.Query,
  },
  Mutation: {
    ...postsResolvers.Mutation,
    ...usersResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...likesResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
    ...usersResolvers.Subscription,
    ...commentsResolvers.Subscription,
    ...likesResolvers.Subscription,
  },
};
