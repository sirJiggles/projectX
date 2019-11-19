import { gql } from 'apollo-boost';

export default gql`
  mutation createChat($name: String!, $members: String) {
    createChat(name: $name, members: []) {
      name
      members
    }
  }
`;
