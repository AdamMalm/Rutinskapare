const mongoose = require("mongoose");

const TimeSchema = new mongoose.Schema({
  specificTime: {
    type: String,
  },
  nonSpecificTime: {
    type: String,
    enum: ["Morgon", "Dag", "Kväll"],
  },
});

module.exports = mongoose.model("Time", TimeSchema);
