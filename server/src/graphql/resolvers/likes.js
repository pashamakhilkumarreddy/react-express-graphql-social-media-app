import { append } from 'ramda';
import { UserInputError } from 'apollo-server';
import { Post } from '../../models/index.js';
import helpers from '../../utils/helpers/index.js';
import { isMongoObjectId } from '../../utils/validations.js';

export default {
  Query: {},
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    async likePost(_, { postId }, context, info) {
      try {
        // console.info(info);
        const user = await helpers.isUserAuthenticated(context);
        if (!user) {
          throw new Error(
            'User is not authenticated to perform this operation',
          );
        }
        if (!isMongoObjectId(postId).isValid) {
          throw new UserInputError('Invalid Mongo ObjectId', {
            errors: {
              body: isMongoObjectId(postId).message,
            },
          });
        }
        const post = await Post.findById(postId);
        if (post) {
          if (post.likes.find((like) => like.username === user.username)) {
            post.likes = post.likes.filter(
              (like) => like.username !== user.username,
            );
          } else {
            post.likes = append(
              {
                username: user.username,
              },
              post.likes,
            );
          }
          await post.save();
          return post;
        }
        throw new UserInputError('Post not found');
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
  Subscription: {},
};
