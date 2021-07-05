import { gql } from 'apollo-server';

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
    createdAt: String!
  }
  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  type Tokens {
    accessToken: String!
    refreshToken: String!
  }
  type User {
    id: ID!
    email: String!
    username: String!
    tokens: Tokens!
    createdAt: String!
  }
  input RegisterInput {
    email: String!
    password: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: RegisterInput): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;

export default typeDefs;
