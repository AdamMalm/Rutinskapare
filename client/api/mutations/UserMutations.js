import { gql } from "@apollo/client";

const GET_USER_ROUTINES = gql`
  query getUserRoutines {
    user(id:"63a078aeb25dcee1fd03dba7") {
      routines {
        id
        title
        timeOfDay{
          id
        }
      }
    }
  }
`;

const UPDATE_USER_ROUTINES = gql`
  mutation updateUserRoutines($routines: [ID]) {
    updateUser(id:"63a078aeb25dcee1fd03dba7", routines: $routines) {
        routines {
        id
      }
    }
  }
`;

export { GET_USER_ROUTINES, UPDATE_USER_ROUTINES };
