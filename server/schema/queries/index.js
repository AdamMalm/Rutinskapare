const { userQuery, usersQuery } = require('./UserQuery');

const queryFields = {
  user: userQuery,
  users: usersQuery,
}

module.exports = {
  queryFields
};