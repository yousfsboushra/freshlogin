import { gql } from "@apollo/client";

export const ACCOUNT_QUERY = gql`
  query($id: ID!) {
    user(id: $id) {
      firstName
      lastName
    }
  }
`;
