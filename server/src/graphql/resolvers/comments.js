import { prepend } from 'ramda';
import { UserInputError } from 'apollo-server';
import { Post } from '../../models/index.js';
import helpers from '../../utils/helpers/index.js';
import { isValidBody, isMongoObjectId } from '../../utils/validations.js';

export default {
  Query: {},
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    async createComment(_, { postId, body }, context, info) {
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
        if (!isValidBody(body).isValid) {
          throw new UserInputError('Empty comment', {
            errors: {
              body: isValidBody(body).message,
            },
          });
        }
        const post = await Post.findById(postId);
        if (post) {
          post.comments = prepend(
            {
              body,
              username: user.username,
            },
            post.comments,
          );
          await post.save();
          return post;
        }
        throw new UserInputError('Post not found');
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    // eslint-disable-next-line no-unused-vars
    async deleteComment(_, { postId, commentId }, context, info) {
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
        if (!isMongoObjectId(commentId).isValid) {
          throw new UserInputError('Invalid Mongo ObjectId', {
            errors: {
              body: isMongoObjectId(commentId).message,
            },
          });
        }
        const post = await Post.findById(postId);
        if (post) {
          const commentIdx = post.comments.findIndex((c) => c.id === commentId);
          if (
            post.comments[commentIdx]
            && post.comments[commentIdx].username === user.username
          ) {
            post.comments.splice(commentIdx, 1);
            await post.save();
            return post;
          }
          throw new Error('User is not authorized to perform this operation');
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
