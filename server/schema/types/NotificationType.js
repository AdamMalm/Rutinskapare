const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = require("graphql");

const { RoutineType } = require("./RoutineType");
const Routine = require("../../models/Routine");

const NotificationType = new GraphQLObjectType({
  name: "Notification",
  description: "This represents a Notification object",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (notification) => notification.id,
    },
    title: {
      type: GraphQLString,
      resolve: (notification) => notification.title,
    },
    description: {
      type: GraphQLString,
      resolve: (notification) => notification.description,
    },
    hasBeenShown: {
      type: GraphQLBoolean,
      resolve: (notification) => notification.hasBeenShown,
    },
    routine: {
      type: RoutineType,
      resolve(parent) {
        return Routine.findById(parent.routineId);
      },
    },
  }),
});

module.exports = { NotificationType };
