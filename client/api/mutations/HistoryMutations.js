import { gql } from "@apollo/client";

const ADD_HISTORY = gql`
  mutation createHistory($completed: Boolean!, $time: DateTime!) {
    createHistory(completed: $completed, time: $time) {
      id
    }
  }
`;

const UPDATE_HISTORY = gql`
    mutation updateHistory($id: ID!, $completed: Boolean!, $time: DateTime!) {
        updateHistory(id: $id, completed: $completed, time: $time) {
            id
            completed
            time
        }
    }
`;

const DELETE_HISTORY = gql`
    mutation deleteHistory($id: ID!) {
        deleteHistory(id: $id) {
            id
            completed
            time
        }
    }
`;

export { ADD_HISTORY, UPDATE_HISTORY, DELETE_HISTORY };
