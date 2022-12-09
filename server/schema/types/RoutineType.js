const { GraphQLObjectType, GraphQLID } = require("graphql");

const RoutineType = new GraphQLObjectType({
  name: "Routine",
  description: "This represents a Routine object",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (routine) => routine.id,
    },
  }),
});

module.exports = { RoutineType };
