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
    routines: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) },
    notifications: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) },
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

const deleteUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    return User.findByIdAndRemove(args.id);
  },
};

const updateUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    hasCompletedOnBoarding: { type: GraphQLBoolean },
    routines: { type: GraphQLID },
    notifications: { type: GraphQLID },
  },
  resolve(parent, args) {
    return User.findByIdAndUpdate(
      args.id,
      {
        $set: {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
          hasCompletedOnBoarding: args.hasCompletedOnBoarding,
          routines: args.routines,
          notifications: args.notifications,
        },
      },
      { new: true },
    );
  },
};

module.exports = { createUser, updateUser, deleteUser };
