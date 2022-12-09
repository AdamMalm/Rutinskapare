const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const { queryFields } = require("./queries/index");
const { mutationFields } = require("./mutations/index");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: queryFields,
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: mutationFields,
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
