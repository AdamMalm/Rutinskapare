const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const RoutineType = new GraphQLObjectType({
  name: "Routine",
  description: "This represents a Routine object",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (routine) => routine.id,
    },
    name: {
      type: GraphQLString,
      resolve: (routine) => routine.name,
    },
  }),
});

module.exports = { RoutineType };
