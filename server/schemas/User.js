import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!
    avatar: String
    name: String
    number: String!
    messages: [Message!]!
    chats: [Chat!]!
  }

  input UserInput {
    name: String!
    number: String!
    avatar: String
  }

  type Token {
    token: String!
  }

  extend type Query {
    user(id: ID!): User!
    users(numbers: [String!]!): [User]!
    currentUser: User
    login(number: String!, password: String!): Token!
  }

  extend type Mutation {
    createUser(number: String!, password: String!): User!
  }
`;
