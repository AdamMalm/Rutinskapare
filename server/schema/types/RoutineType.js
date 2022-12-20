const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = require("graphql");
const Time = require("../../models/Time");
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
      type: GraphQLString,
      resolve: (routine) => routine.frequency,
    },
    highPriority: {
      type: GraphQLBoolean,
      resolve: (routine) => routine.highPriority,
    },
    timeOfDay: {
      type: TimeType,
      resolve: (routine) => Time.findById(routine.timeOfDay),
    },
    historyOfCompletion: {
      type: HistoryType,
      resolve: (routine) => History.findById(routine.historyOfCompletion),
    },
  }),
});

module.exports = { RoutineType };
