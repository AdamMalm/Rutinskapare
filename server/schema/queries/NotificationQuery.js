const { GraphQLList, GraphQLID } = require("graphql");

const { NotificationType } = require("../types");
const Notification = require("../../models/Notification");

const notificationQuery = {
  type: NotificationType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return Notification.findById(args.id);
  },
};

const notificationsQuery = {
  type: new GraphQLList(NotificationType),
  resolve() {
    return Notification.find();
  },
};

module.exports = { notificationQuery, notificationsQuery };
