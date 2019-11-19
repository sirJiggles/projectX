import { gql } from 'apollo-boost';

export default gql`
  mutation createChat($name: String!, $members: [User!]!) {
    createChat(name: $name, members: $members) {
      name
      members
    }
  }
`;
