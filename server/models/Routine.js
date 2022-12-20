const mongoose = require("mongoose");

const RoutineSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  frequency: {
    type: String,
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

  highPriority: {
    type: Boolean,
  },
  timeOfDay: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Time",
  },
  historyOfCompletion: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "History",
    },
  ],
});

module.exports = mongoose.model("Routine", RoutineSchema);
