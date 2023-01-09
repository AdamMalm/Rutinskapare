const { GraphQLList, GraphQLID } = require("graphql");

const { HistoryType } = require("../types");
const History = require("../../models/History");

const historyQuery = {
  type: HistoryType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return History.findById(args.id);
  },
};

const historiesQuery = {
  type: new GraphQLList(HistoryType),
  resolve() {
    return History.find();
  },
};

module.exports = { historyQuery, historiesQuery };
