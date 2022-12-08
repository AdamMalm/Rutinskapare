const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
  } = require('graphql');
  
  const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: {
        type: GraphQLID,
        resolve: (user) => user.id,
      },
      name: {
        type: GraphQLString,
        resolve: (user) => user.name,
      },
    }),
  });
  
  module.exports = { UserType };