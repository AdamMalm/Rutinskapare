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
      name: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      const user = new User({
        name: args.name
      });

      return user.save();
    },
  };

  module.exports = { createUser };