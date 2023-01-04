import { gql } from "@apollo/client";

const GET_ROUTINES = gql`
  query getRoutines {
    routines {
      id
    }
  }
`;

export { GET_ROUTINES };
