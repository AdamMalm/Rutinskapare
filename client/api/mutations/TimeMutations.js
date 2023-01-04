import { gql } from "@apollo/client";

const ADD_TIME = gql`
    mutation createTime($specificTime: String!, $nonSpecificTime: TimeOfDay!) {
        createTime(specificTime: $specificTime, nonSpecificTime: $nonSpecificTime) {
            id
            specificTime
            nonSpecificTime
        }
    }
`;

const UPDATE_TIME = gql`
    mutation updateTime($id: ID!, $specificTime: String!, $nonSpecificTime: TimeOfDay!) {
        updateTime(id: $id, specificTime: $specificTime, nonSpecificTime: $nonSpecificTime) {
            id
            specificTime
            nonSpecificTime
        }
    }
`;

const DELETE_TIME = gql`
    mutation deleteTime($id: ID!) {
        deleteTime(id: $id) {
            id
            specificTime
            nonSpecificTime
        }
    }
`;

export { ADD_TIME, UPDATE_TIME, DELETE_TIME };
