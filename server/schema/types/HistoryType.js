const { GraphQLObjectType, GraphQLID, GraphQLBoolean } = require("graphql");

const { DateTimeScalar } = require("./DateTimeScalar");

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
      type: DateTimeScalar,
      resolve: (history) => history.time,
    },
  }),
});

module.exports = { HistoryType };
