const {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

const { TimeType } = require("../types");

const Time = require("../../models/Time");

const createTime = {
  type: TimeType,
  description: "The mutation that allows you to create a new Time object",
  args: {
    specificTime: { type: GraphQLString },
    nonSpecificTime: {
      type: new GraphQLEnumType({
        name: "TimeOfDay",
        values: {
          morning: { value: "Morgon" },
          day: { value: "Dag" },
          evening: { value: "Kväll" },
        },
      }),
      defaultValue: "Morgon",
    },
  },
  resolve(parent, args) {
    const time = new Time({
      specificTime: args.specificTime,
      nonSpecificTime: args.nonSpecificTime,
    });

    return time.save();
  },
};

const updateTime = {
  type: TimeType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    specificTime: { type: GraphQLString },
    nonSpecificTime: {
      type: new GraphQLEnumType({
        name: "TimeOfDay",
        values: {
          morning: { value: "Morgon" },
          day: { value: "Dag" },
          evening: { value: "Kväll" },
        },
      }),
      defaultValue: "Morgon",
    },
  },
  resolve(parent, args) {
    return Time.findByIdAndUpdate(
      args.id,
      {
        $set: {
          specificTime: args.specificTime,
          nonSpecificTime: args.nonSpecificTime,
        },
      },
      { new: true },
    );
  },
};

const deleteTime = {
  type: TimeType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, args) {
    return Time.findByIdAndDelete(args.id);
  },
};

module.exports = { createTime, updateTime, deleteTime };
