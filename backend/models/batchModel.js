const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide user reference"],
    ref: "User",
  },
  batch: {
    type: String,
    enum: ["6-7 AM", "7-8 AM", "8-9 AM", "5-6 PM"],
    default: null,
  },
  month: {
    type: String,
    enum: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  enrollDate: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: false,
  },
  transferId: {
    type: String,
    default: null,
  },
  transferDate: {
    type: Date,
    default: null,
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Batch", batchSchema);
