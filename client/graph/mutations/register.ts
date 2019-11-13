import { gql } from 'apollo-boost';

export default gql`
  mutation Register($name: String!, $password: String!) {
    createUser(name: $name, password: $password) {
      id
    }
  }
`;
