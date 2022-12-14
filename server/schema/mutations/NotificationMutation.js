const {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");

const { NotificationType } = require("../types");

const Notification = require("../../models/Notification");

const createNotification = {
  type: NotificationType,
  description:
    "The mutation that allows you to create a new Notification object",
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    hasBeenShown: { type: new GraphQLNonNull(GraphQLBoolean) },
    routine: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    const notification = new Notification({
      title: args.title,
      description: args.description,
      hasBeenShown: args.hasBeenShown,
      routine: args.routine,
    });

    return notification.save();
  },
};

const updateNotification = {
  type: NotificationType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    hasBeenShown: { type: GraphQLBoolean },
    routine: { type: GraphQLID },
  },
  resolve(parent, args) {
    return Notification.findByIdAndUpdate(
      args.id,
      {
        $set: {
          title: args.title,
          description: args.description,
          hasBeenShown: args.hasBeenShown,
          routine: args.routine,
        },
      },
      { new: true },
    );
  },
};

const deleteNotification = {
  type: NotificationType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    return Notification.findByIdAndDelete(args.id);
  },
};

module.exports = { createNotification, updateNotification, deleteNotification };
