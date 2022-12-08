const {
    GraphQLObjectType,
    GraphQLID,
  } = require('graphql');
  
  const RoutineType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a User',
    fields: () => ({
      id: {
        type: GraphQLID,
        resolve: (routine) => routine.id,
      },
    }),
  });
  
  module.exports = { RoutineType };