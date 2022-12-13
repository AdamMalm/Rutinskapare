const { UserType } = require("../types");

const User = require("../../models/User");

const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
} = require("graphql");

const createUser = {
  type: UserType,
  description: "The mutation that allows you to create a new User",
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    hasCompletedOnBoarding: { type: new GraphQLNonNull(GraphQLBoolean) },
    routines: { type: new GraphQLList(GraphQLID) },
    notifications: { type: new GraphQLList(GraphQLID) },
  },
  resolve(parent, args) {
    const user = new User({
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      password: args.password,
      hasCompletedOnBoarding: args.hasCompletedOnBoarding,
      routines: args.routines,
      notifications: args.notifications,
    });

    return user.save();
  },
};

module.exports = { createUser };
