const { userQuery, usersQuery } = require("./UserQuery");
const { routineQuery, routinesQuery } = require("./RoutineQuery");
const { historyQuery, historiesQuery } = require("./HistoryQuery");
const {
  notificationQuery,
  notificationsQuery,
} = require("./NotificationQuery");

const queryFields = {
  user: userQuery,
  users: usersQuery,
  routine: routineQuery,
  routines: routinesQuery,
  history: historyQuery,
  histories: historiesQuery,
  notification: notificationQuery,
  notifications: notificationsQuery,
};

module.exports = {
  queryFields,
};
