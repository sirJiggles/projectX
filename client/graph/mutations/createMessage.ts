import { gql } from 'apollo-boost';

export default gql`
  mutation CreateMessage($content: String!) {
    createMessage(content: $content) {
      content
      id
      author {
        id
        name
      }
    }
  }
`;
