import { gql } from 'apollo-boost';

export default gql`
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
`;
