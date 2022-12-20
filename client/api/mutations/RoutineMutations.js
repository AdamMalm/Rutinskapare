import { gql } from "@apollo/client";

const ADD_ROUTINE = gql`
  mutation createRoutine($title: String!, $description: String!, $frequency: RoutineTime!, $highPriority: Boolean!, $timeOfDay: ID!) {
    createRoutine(title: $title, description: $description, frequency: $frequency, highPriority: $highPriority, timeOfDay: $timeOfDay) {
        id
        title
        description
        frequency
        highPriority
        timeOfDay{
          id
          specificTime
          nonSpecificTime
        }
    }
  }
`;

const DELETE_ROUTINE = gql`
    mutation deleteRoutine($id: ID!) {
        deleteRoutine(id: $id) {
            id
            title
        }
    }
`;

export { ADD_ROUTINE, DELETE_ROUTINE };
