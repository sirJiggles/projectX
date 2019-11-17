import { gql } from 'apollo-server';

export default gql`
  type Message {
    id: ID!
    content: String!
    author: User!
  }

  extend type Query {
    message(id: ID!): Message!
    messages: [Message!]!
  }

  extend type Subscription {
    newMessage: Message!
  }

  extend type Mutation {
    createMessage(content: String!): Message!
  }
`;
