import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!
    avatar: String
    name: String
    number: String!
    messages: [Message!]!
    chats: [Chat!]!
    authcode: AuthCode!
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
    authenticate(code: String!, userId: String!): Token!
  }

  extend type Mutation {
    getSMSCode(number: String!): User!
  }
`;
