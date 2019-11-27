import { gql } from 'apollo-boost';

export default gql`
  query Authenticate($code: String!, $userId: String!) {
    authenticate(code: $code, userId: $userId) {
      token
    }
  }
`;
