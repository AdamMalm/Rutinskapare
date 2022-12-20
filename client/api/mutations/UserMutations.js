import { gql } from "@apollo/client";

const UPDATE_USER_ROUTINES = gql`
  mutation updateUserRoutines($routines: [ID]) {
    updateUser(id:"63a078aeb25dcee1fd03dba7", routines: $routines) {
        routines {
        id
      }
    }
  }
`;

export { UPDATE_USER_ROUTINES };
