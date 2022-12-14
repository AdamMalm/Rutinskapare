const { GraphQLList, GraphQLID } = require("graphql");

const { RoutineType } = require("../types");
const Routine = require("../../models/Routine");

const routineQuery = {
  type: RoutineType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return Routine.findById(args.id);
  },
};

const routinesQuery = {
  type: new GraphQLList(RoutineType),
  resolve() {
    return Routine.find();
  },
};

module.exports = { routineQuery, routinesQuery };
