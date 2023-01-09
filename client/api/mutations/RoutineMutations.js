import { gql } from "@apollo/client";

const ADD_ROUTINE = gql`
  mutation createRoutine($title: String!, $description: String, $frequency: [RoutineTime]!, $highPriority: Boolean!, $timeOfDay: TimeInput!, $historyOfCompletion: [ID]! ) {
    createRoutine(title: $title, description: $description, frequency: $frequency, highPriority: $highPriority, timeOfDay: $timeOfDay, historyOfCompletion: $historyOfCompletion) {
        id
        title
        description
        frequency
        highPriority
        timeOfDay{
          isSpecific
          specificTime
          nonSpecificTime
        }
        historyOfCompletion {
          id
          completed
          time
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

const UPDATE_ROUTINE_HISTORY = gql`
  mutation updateRoutine($id: ID!, $historyOfCompletion: [ID]) {
    updateRoutine(id: $id, historyOfCompletion: $historyOfCompletion) {
        id
        title
        description
        frequency
        highPriority
        timeOfDay {
          id
          specificTime
          nonSpecificTime
        }
        historyOfCompletion {
          id
          completed
          time
        }
    }
}
`;

export { ADD_ROUTINE, DELETE_ROUTINE, UPDATE_ROUTINE_HISTORY };
