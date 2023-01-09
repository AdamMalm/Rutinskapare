const {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType,
} = require("graphql");

const TimeType = new GraphQLObjectType({
  name: "Time",
  description: "This represents a Time object",
  fields: () => ({
    isSpecific: {
      type: GraphQLBoolean,
    },
    nonSpecificTime: {
      type: GraphQLString,
    },
    specificTime: {
      type: GraphQLString,
    },
  }),
});

const TimeTypeInput = new GraphQLInputObjectType({
  name: "TimeInput",
  description: "This represents a Time object for input",
  fields: () => ({
    isSpecific: {
      type: GraphQLBoolean,
    },
    nonSpecificTime: {
      type: GraphQLString,
    },
    specificTime: {
      type: GraphQLString,
    },
  }),
});

module.exports = { TimeType, TimeTypeInput };
