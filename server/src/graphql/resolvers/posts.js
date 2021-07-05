import { Post } from '../../models/index.js';

const posts = {
  Query: {
    async getPosts() {
      try {
        const allPosts = await Post.find();
        return allPosts;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },
    async getPost(_, { postId }, context, info) {
      try {
        console.info(context, info);
        const post = await Post.findOne({
          _id: postId,
        });
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
    async createPost(_, { body }, context, info) {
      try {
        console.info(context, info);
        const newPost = new Post({
          body,
        });
        const post = await newPost.save();
        return post;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },
  },
};

export default posts;
