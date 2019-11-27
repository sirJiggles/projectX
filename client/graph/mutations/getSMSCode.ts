import { gql } from 'apollo-boost';

export default gql`
  mutation GetSMSCode($number: String!) {
    getSMSCode(number: $number) {
      id
    }
  }
`;
