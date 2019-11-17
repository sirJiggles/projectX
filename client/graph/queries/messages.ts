import { gql } from 'apollo-boost';

export default gql`
  {
    messages {
      content
      id
      author {
        id
        name
      }
    }
  }
`;
