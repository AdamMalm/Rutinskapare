import { gql } from "@apollo/client";

const ADD_ROUTINE = gql`
  mutation createRoutine($title: String, $description: String, $frequency: RoutineTime!, $highPriority: Boolean, $timeOfDay: ID!) {
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

const ADD_ROUTINE2 = gql`
mutation createRoutine($title: String, $description: String, $highPriority: Boolean, $timeOfDay: ID!) {
  createRoutine(title: $title, description: $description, highPriority: $highPriority, timeOfDay: $timeOfDay) {
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

export { ADD_ROUTINE, ADD_ROUTINE2 };
