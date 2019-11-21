import { gql } from 'apollo-boost';

export default gql`
  query Users($numbers: [String!]!) {
    users(numbers: $numbers) {
      id
      name
      avatar
      number
    }
  }
`;
