import { AuthenticationError, UserInputError } from 'apollo-server';
import { Post } from '../../models/index.js';
import { isValidBody } from '../../utils/validations.js';
import helpers from '../../utils/helpers/index.js';

const posts = {
  Query: {
    async getPosts() {
      try {
        const allPosts = await Post.find().sort({ createdAt: -1 });
        return allPosts;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async getPost(_, { postId }, context, info) {
      try {
        // console.info(context, info);
        const post = await Post.findOne({
          _id: postId,
        }).lean();
        if (post) {
          return post;
        }
        throw new Error('Post not found!');
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    async createPost(_, { body }, context, info) {
      try {
        // console.info(context, info);
        const user = await helpers.isUserAuthenticated(context);
        if (user) {
          if (!isValidBody(body).isValid) {
            throw new UserInputError('Empty post body', {
              errors: {
                body: isValidBody(body).message,
              },
            });
          }
          const newPost = new Post({
            body,
            user: user.id,
            username: user.username,
          });
          const post = await newPost.save();
          context.pubsub.publish('NEW_POST', {
            newPost: post,
          });
          return post;
        }
        throw new Error('User is not authenticated to perform this operation');
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async deletePost(_, { postId }, context, info) {
      try {
        // console.info(info);
        const user = await helpers.isUserAuthenticated(context);
        if (!user) {
          throw new Error(
            'User is not authenticated to perform this operation',
          );
        }
        const post = await Post.findOne({
          _id: postId,
        });
        if (post.username === user.username) {
          await Post.deleteOne({
            _id: postId,
          }).lean();
          return 'Post is successfully deleted';
        }
        throw new AuthenticationError(
          'User is not authorized to perform this operation',
        );
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe(_, __, { pubsub }) {
        return pubsub.asyncIterator('NEW_POST');
      },
    },
  },
};

export default posts;
