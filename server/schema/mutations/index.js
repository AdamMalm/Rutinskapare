const { createUser, updateUser, deleteUser } = require("./UserMutation");
const {
  createRoutine,
  deleteRoutine,
  updateRoutine,
} = require("./RoutineMutation");
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
