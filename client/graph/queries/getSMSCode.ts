import { gql } from 'apollo-boost';

export default gql`
  query GetSMSCode($number: String!) {
    getSMSCode(number: $number) {
      id
    }
  }
`;
