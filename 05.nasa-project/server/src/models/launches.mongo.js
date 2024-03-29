const mongoose = require("mongoose");
const launchesSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: Number,
      required: true,
    },
    launcheDate: {
      type: Date,
      required: true,
    },
    mission: {
      type: String,
      required: true,
    },
    rocket: {
      type: Number,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    customers: [String],
    upcoming: {
      type: Boolean,
      required: true,
    },
    success: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("Launch", launchesSchema);
