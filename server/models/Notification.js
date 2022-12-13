const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  hasBeenShown: {
    type: Boolean,
  },
  routineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Routine",
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);
