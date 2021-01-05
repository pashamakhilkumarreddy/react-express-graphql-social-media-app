const { gql } = require('apollo-server');

module.exports = gql`
    type Tokens {
        refreshToken: String!
        accessToken: String!
    }
    type User {
        _id: ID!
        email: String!
        username: String!
        tokens: Tokens
    }
    type Post {
        _id: ID!
        userId: ID!
        content: String!
    }
    type Query {
        getPosts: [Post]
    }
    input Register {
        email: String!
        password: String!
    }
    type Mutation {
        register(input: Register): User
    }
`;
