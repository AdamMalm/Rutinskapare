const { createUser } = require("./UserMutation");
const { createRoutine } = require("./RoutineMutation");

const mutationFields = {
  createUser,
  createRoutine,
};

module.exports = {
  mutationFields,
};
