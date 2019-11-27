import { gql } from 'apollo-server';

export default gql`
  type AuthCode {
    id: ID!
    code: String!
    expiry: Date!
    user: User!
  }
`;
