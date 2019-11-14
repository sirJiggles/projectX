//createMessage(content: String!): Message!
import { gql } from 'apollo-boost';

export default gql`
  mutation CreateMessage($content: String!) {
    createMessage(content: $content) {
      message
    }
  }
`;
