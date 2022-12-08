
const {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLID,
  } = require('graphql');
  
  const { UserType } = require('../types');
  const User = require('../../models/User');
  
  const userQuery = {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
        return User.findById(args.id);
    },
  };

  const usersQuery = {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
        return User.find();
    }
  }
  
  module.exports = { userQuery, usersQuery };