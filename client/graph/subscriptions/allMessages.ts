import { gql } from 'apollo-boost';

export default gql`
  subscription {
    allMessages {
      content
      id
      author {
        id
        name
      }
    }
  }
`;
