import { gql } from 'apollo-boost';

export default gql`
  mutation Register($number: String!, $password: String!) {
    createUser(number: $number, password: $password) {
      id
    }
  }
`;
