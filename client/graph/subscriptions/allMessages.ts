import { gql } from 'apollo-boost';

export default gql`
  subscription allMessages() {
    {
      allMessages {
        content
        id
        author {
          id
          name
        }
      }
    }
  }
`;
