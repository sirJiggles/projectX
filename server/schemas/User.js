import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!
    name: String!
    messages: [Message!]!
  }

  type Token {
    token: String!
  }

  extend type Query {
    user(id: ID!): User!
    currentUser: User
  }

  extend type Mutation {
    createUser(name: String!, password: String!): User!
    login(name: String!, password: String!): Token!
  }
`;
