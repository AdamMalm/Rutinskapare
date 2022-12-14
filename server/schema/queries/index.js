const { userQuery, usersQuery } = require("./UserQuery");
const { routineQuery, routinesQuery } = require("./RoutineQuery");
const { timeQuery, timesQuery } = require("./TimeQuery");
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
  time: timeQuery,
  times: timesQuery,
  history: historyQuery,
  histories: historiesQuery,
  notification: notificationQuery,
  notifications: notificationsQuery,
};

module.exports = {
  queryFields,
};
