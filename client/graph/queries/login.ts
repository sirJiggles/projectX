import { gql } from 'apollo-boost';

export default gql`
  query Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
    }
  }
`;
