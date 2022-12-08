const {
    GraphQLObjectType,
    GraphQLID,
  } = require('graphql');
  
  const TimeType = new GraphQLObjectType({
    name: 'Time',
    description: 'This represents a Time object',
    fields: () => ({
      id: {
        type: GraphQLID,
        resolve: (time) => time.id,
      },
    }),
  });
  
  module.exports = { TimeType };