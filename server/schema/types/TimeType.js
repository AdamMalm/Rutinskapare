const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const TimeType = new GraphQLObjectType({
  name: "Time",
  description: "This represents a Time object",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (time) => time.id,
    },
    specificTime: {
      type: GraphQLString,
      resolve: (time) => time.specificTime,
    },
    nonSpecificTime: {
      type: GraphQLString,
      resolve: (time) => time.nonSpecificTime,
    },
  }),
});

module.exports = { TimeType };
