import { gql } from 'apollo-server';

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
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
  }
`;

export default typeDefs;
