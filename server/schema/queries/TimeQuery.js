const { GraphQLList, GraphQLID } = require("graphql");

const { TimeType } = require("../types");
const Time = require("../../models/Time");

const timeQuery = {
  type: TimeType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return Time.findById(args.id);
  },
};

const timesQuery = {
  type: new GraphQLList(TimeType),
  resolve() {
    return Time.find();
  },
};

module.exports = { timeQuery, timesQuery };
