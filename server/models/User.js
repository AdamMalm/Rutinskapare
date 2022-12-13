const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  hasCompletedOnBoarding: {
    type: Boolean,
  },
  routines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Routine",
    },
  ],
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
