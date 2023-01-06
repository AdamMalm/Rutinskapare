import { gql } from "@apollo/client";

const GET_ROUTINES = gql`
  query getRoutines {
    routines {
      id
    }
  }
`;

const GET_ROUTINE_HISTORY = gql`
  query getRoutineHistory($routineId: ID!) {
    routine(id: $routineId) {
      historyOfCompletion {
        id
        completed
        time
      }
    }
  }
`;

export { GET_ROUTINES, GET_ROUTINE_HISTORY };
