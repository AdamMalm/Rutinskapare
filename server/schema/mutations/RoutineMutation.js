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
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    frequency: {
      type: new GraphQLEnumType({
        name: "RoutineTime",
        values: {
          monday: { value: "Måndag" },
          tuesday: { value: "Tisdag" },
          wednesday: { value: "Onsdag" },
          thursday: { value: "Torsdag" },
          friday: { value: "Fredag" },
          saturday: { value: "Lördag" },
          sunday: { value: "Söndag" },
        },
      }),
      defaultValue: "Måndag",
    },
    highPriority: { type: new GraphQLNonNull(GraphQLBoolean) },
    timeOfDay: { type: GraphQLID },
    historyOfCompletion: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
    },
  },
  resolve(parent, args) {
    const routine = new Routine({
      title: args.title,
      description: args.description,
      frequency: args.frequency,
      highPriority: args.highPriority,
      timeOfDay: args.timeOfDay,
      historyOfCompletion: args.historyOfCompletion,
    });

    return routine.save();
  },
};

const deleteRoutine = {
  type: RoutineType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    return Routine.findByIdAndRemove(args.id);
  },
};

const updateRoutine = {
  type: RoutineType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    frequency: {
      type: new GraphQLEnumType({
        name: "RoutineTimeUpdate",
        values: {
          monday: { value: "Måndag" },
          tuesday: { value: "Tisdag" },
          wednesday: { value: "Onsdag" },
          thursday: { value: "Torsdag" },
          friday: { value: "Fredag" },
          saturday: { value: "Lördag" },
          sunday: { value: "Söndag" },
        },
      }),
      defaultValue: "Måndag",
    },
    highPriority: { type: GraphQLBoolean },
    timeOfDay: { type: GraphQLID },
    historyOfCompletion: { type: new GraphQLList(GraphQLID) },
  },
  resolve(parent, args) {
    return Routine.findByIdAndUpdate(
      args.id,
      {
        $set: {
          title: args.title,
          description: args.description,
          frequency: args.frequency,
          highPriority: args.highPriority,
          timeOfDay: args.timeOfDay,
          historyOfCompletion: args.historyOfCompletion,
        },
      },
      { new: true },
    );
  },
};

module.exports = { createRoutine, deleteRoutine, updateRoutine };
