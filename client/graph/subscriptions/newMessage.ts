import { gql } from 'apollo-boost';

export default gql`
  subscription {
    newMessage {
      content
      id
      author {
        id
        name
      }
    }
  }
`;
