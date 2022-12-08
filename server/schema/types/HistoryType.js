const {
    GraphQLObjectType,
    GraphQLID,
  } = require('graphql');
  
  const HistoryType = new GraphQLObjectType({
    name: 'History',
    description: 'This represents a History object',
    fields: () => ({
      id: {
        type: GraphQLID,
        resolve: (history) => history.id,
      },
    }),
  });
  
  module.exports = { HistoryType };