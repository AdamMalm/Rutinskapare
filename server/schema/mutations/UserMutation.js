const { UserType } = require('../types');

const User = require('../../models/User')

const {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
  } = require('graphql');

  const createUser = {
    type: UserType,
    description: 'The mutation that allows you to create a new User',
    args: {
      firstName: { type: new GraphQLNonNull(GraphQLString) },
      lastName: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      // Fortsätt här
    },
    resolve(parent, args) {
      const user = new User({
        firstname: args.firstname,
        lastname: args.lastname,
        email: args.email,
        password: args.password,
        // Fortsätt här
      });

      return user.save();
    },
  };

  module.exports = { createUser };