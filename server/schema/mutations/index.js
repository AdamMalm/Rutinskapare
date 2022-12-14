const { createUser, updateUser, deleteUser } = require("./UserMutation");
const {
  createRoutine,
  deleteRoutine,
  updateRoutine,
} = require("./RoutineMutation");

const mutationFields = {
  createUser,
  deleteUser,
  updateUser,
  createRoutine,
  deleteRoutine,
  updateRoutine,
};

module.exports = {
  mutationFields,
};
