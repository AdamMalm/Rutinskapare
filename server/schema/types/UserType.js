const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");

const { RoutineType } = require("./RoutineType");
const { NotificationType } = require("./NotificationType");
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
      resolve: (user) => user.firstName,
    },
    lastName: {
      type: GraphQLString,
      resolve: (user) => user.lastName,
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
      resolve(parent) {
        return parent.routines.filter(() =>
          Routine.findById("63986848fa426729a9e7095f"),
        );
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
