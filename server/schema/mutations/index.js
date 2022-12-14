const { createUser, updateUser, deleteUser } = require("./UserMutation");
const {
  createRoutine,
  deleteRoutine,
  updateRoutine,
} = require("./RoutineMutation");
const { createTime, updateTime, deleteTime } = require("./TimeMutation");
const {
  createHistory,
  updateHistory,
  deleteHistory,
} = require("./HistoryMutation");
const {
  createNotification,
  updateNotification,
  deleteNotification,
} = require("./NotificationMutation");

const mutationFields = {
  createUser,
  deleteUser,
  updateUser,
  createRoutine,
  deleteRoutine,
  updateRoutine,
  createTime,
  updateTime,
  deleteTime,
  createHistory,
  updateHistory,
  deleteHistory,
  createNotification,
  updateNotification,
  deleteNotification,
};

module.exports = {
  mutationFields,
};
