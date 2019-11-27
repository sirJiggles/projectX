import userSchema from './User';
import messageSchema from './Message';
import chatSchema from './Chat';
import authCodeSchema from './AuthCode';
import { gql } from 'apollo-server';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  chatSchema,
  userSchema,
  messageSchema,
  authCodeSchema
];
