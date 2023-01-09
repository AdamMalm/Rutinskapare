const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");
const History = require("../../models/History");
const { TimeType } = require("./TimeType");
const { HistoryType } = require("./HistoryType");

const RoutineType = new GraphQLObjectType({
  name: "Routine",
  description: "This represents a Routine object",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (routine) => routine.id,
    },
    title: {
      type: GraphQLString,
      resolve: (routine) => routine.title,
    },
    description: {
      type: GraphQLString,
      resolve: (routine) => routine.description,
    },
    frequency: {
      type: new GraphQLList(GraphQLString),
      resolve: (routine) => routine.frequency,
    },
    highPriority: {
      type: GraphQLBoolean,
      resolve: (routine) => routine.highPriority,
    },
    timeOfDay: {
      type: TimeType,
      resolve: (routine) => routine.timeOfDay,
    },
    historyOfCompletion: {
      type: new GraphQLList(HistoryType),
      resolve(parent) {
        return Array.from(parent.historyOfCompletion, (historyId) =>
          History.findById(historyId),
        );
      },
    },
  }),
});

module.exports = { RoutineType };
