const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");

const { RoutineType, NotificationType } = require("./index");
const Routine = require("../../models/Routine");
const Notification = require("../../models/Notification");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a User object",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (user) => user.id,
    },
    firstName: {
      type: GraphQLString,
      resolve: (user) => user.firstname,
    },
    lastName: {
      type: GraphQLString,
      resolve: (user) => user.lastname,
    },
    email: {
      type: GraphQLString,
      resolve: (user) => user.email,
    },
    password: {
      type: GraphQLString,
      resolve: (user) => user.password,
    },
    hasCompletedOnBoarding: {
      type: GraphQLBoolean,
      resolve: (user) => user.hasCompletedOnBoarding,
    },
    routines: {
      type: new GraphQLList(RoutineType),
      resolve() {
        return Routine.find();
      },
    },
    notifications: {
      type: new GraphQLList(NotificationType),
      resolve() {
        return Notification.find();
      },
    },
  }),
});

module.exports = { UserType };
