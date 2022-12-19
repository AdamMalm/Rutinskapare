import { gql } from "@apollo/client";

// DEN HÄR ANVÄNDAREN ÄR HÅRDKODAD

const GET_USER = gql`
  query getRoutines {
    user(id: "63a078aeb25dcee1fd03dba7") {
        id
        firstName
        lastName
        email
        password
        routines {
          id
        }
        notifications {
          id
        }
      }
  }
`;

const GET_USER_ROUTINES = gql`
  query getRoutines {
    user(id: "63a078aeb25dcee1fd03dba7") {
        routines {
            id
            title
            description
            frequency
            highPriority
            timeOfDay {
            id
            specificTime
            }
            historyOfCompletion {
            completed
            time
            }
        }
    }
  }
`;

export { GET_USER, GET_USER_ROUTINES };
