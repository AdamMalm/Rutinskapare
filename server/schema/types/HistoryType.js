const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLBoolean,
  GraphQLString,
} = require("graphql");

const HistoryType = new GraphQLObjectType({
  name: "History",
  description: "This represents a History object",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (history) => history.id,
    },
    completed: {
      type: GraphQLBoolean,
      resolve: (history) => history.completed,
    },
    time: {
      type: GraphQLString,
      resolve: (history) => history.completed,
    },
  }),
});

module.exports = { HistoryType };
