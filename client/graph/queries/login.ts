import { gql } from 'apollo-boost';

export default gql`
  query Login($number: String!, $password: String!) {
    login(number: $number, password: $password) {
      token
    }
  }
`;
