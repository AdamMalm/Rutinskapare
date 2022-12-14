const { userQuery, usersQuery } = require("./UserQuery");
const { routineQuery, routinesQuery } = require("./RoutineQuerry");

const queryFields = {
  user: userQuery,
  users: usersQuery,
  routine: routineQuery,
  routines: routinesQuery,
};

module.exports = {
  queryFields,
};
