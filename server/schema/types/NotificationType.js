const { GraphQLObjectType, GraphQLID } = require("graphql");

const NotificationType = new GraphQLObjectType({
  name: "Notification",
  description: "This represents a Notification object",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (notification) => notification.id,
    },
  }),
});

module.exports = { NotificationType };
