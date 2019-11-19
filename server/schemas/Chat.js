import { gql } from 'apollo-server';

export default gql`
  type Chat {
    id: ID!
    name: String!
    owner: User!
    messages: [Message!]!
    members: [User!]!
  }

  extend type Query {
    chat(id: ID!): Chat!
    chats: [Chat!]!
  }

  extend type Subscription {
    newChat: Chat!
  }

  extend type Mutation {
    createChat(content: String!): Chat!
  }
`;
