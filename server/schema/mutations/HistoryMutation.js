const { GraphQLID, GraphQLNonNull, GraphQLBoolean } = require("graphql");
const { DateTimeScalar } = require("../types/DateTimeScalar");

const { HistoryType } = require("../types");

const History = require("../../models/History");

const createHistory = {
  type: HistoryType,
  description: "The mutation that allows you to create a new History object",
  args: {
    completed: { type: new GraphQLNonNull(GraphQLBoolean) },
    time: { type: DateTimeScalar },
  },
  resolve(parent, args) {
    const history = new History({
      completed: args.completed,
      time: args.time,
    });

    return history.save();
  },
};

const updateHistory = {
  type: HistoryType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    completed: { type: GraphQLBoolean },
    time: { type: DateTimeScalar },
  },
  resolve(parent, args) {
    return History.findByIdAndUpdate(
      args.id,
      {
        $set: {
          completed: args.completed,
          time: args.time,
        },
      },
      { new: true },
    );
  },
};

const deleteHistory = {
  type: HistoryType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    return History.findByIdAndDelete(args.id);
  },
};

module.exports = { createHistory, updateHistory, deleteHistory };
