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
    mutation updateTime($specificTime: String!, $nonSpecificTime: TimeOfDay!) {
        updateTime(specificTime: $specificTime, nonSpecificTime: $nonSpecificTime) {
            id
            specificTime
            nonSpecificTime
        }
    }
`;

export { ADD_TIME, UPDATE_TIME };
