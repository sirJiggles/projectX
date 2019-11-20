import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!
    name: String!
    messages: [Message!]!
    chats: [Chat!]!
  }

  input UserInput {
    id: ID!
  }

  type Token {
    token: String!
  }

  extend type Query {
    user(id: ID!): User!
    currentUser: User
    login(name: String!, password: String!): Token!
  }

  extend type Mutation {
    createUser(name: String!, password: String!): User!
  }
`;
