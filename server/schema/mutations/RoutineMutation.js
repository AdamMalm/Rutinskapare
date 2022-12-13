const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLEnumType,
} = require("graphql");
const { RoutineType } = require("../types");

const Routine = require("../../models/Routine");

const createRoutine = {
  type: RoutineType,
  description: "The mutation that allows you to create a new Routine",
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    frequency: {
      type: new GraphQLEnumType({
        name: "RoutineTime",
        values: {
          monday: { value: "Monday" },
          tuesday: { value: "Tuesday" },
          wednesday: { value: "Wednesday" },
          thursday: { value: "Thursday" },
          friday: { value: "Friday" },
          saturday: { value: "Saturday" },
          sunday: { value: "Sunday" },
        },
      }),
      defaultValue: "Monday",
    },
    highPriority: { type: new GraphQLNonNull(GraphQLBoolean) },
    timeOfDay: { type: GraphQLID },
    historyOfCompletion: { type: new GraphQLList(GraphQLID) },
  },
  resolve(parent, args) {
    const routine = new Routine({
      name: args.name,
      description: args.description,
      frequency: args.frequency,
      highPriority: args.highPriority,
      timeOfDay: args.timeOfDay,
      historyOfCompletion: args.historyOfCompletion,
    });

    return routine.save();
  },
};

module.exports = { createRoutine };
