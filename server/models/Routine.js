const mongoose = require("mongoose");

const RoutineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  frequency: [
    {
      type: String,
      required: true,
      enum: [
        "Måndag",
        "Tisdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lördag",
        "Söndag",
      ],
    },
  ],
  highPriority: {
    type: Boolean,
    required: true,
  },
  timeOfDay: {
    isSpecific: {
      type: Boolean,
    },
    specificTime: {
      type: String,
    },
    nonSpecificTime: {
      type: String,
      enum: ["", "Morgon", "Dag", "Kväll"],
    },
  },
  historyOfCompletion: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "History",
    },
  ],
});

module.exports = mongoose.model("Routine", RoutineSchema);
