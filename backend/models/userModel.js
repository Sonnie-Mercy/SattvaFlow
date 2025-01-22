const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a username"],
    trim: true,
    maxlength: [20, "Username cannot be more than 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter a email"],
    trim: true,
    maxlength: [50, "Username cannot be more than 50 characters"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Please enter your age as a number"],
    trim: true,
    maxlength: [2, "Username cannot be more than 2 digits"],
  },
  gender: {
    type: String,
    trim: true,
  },

  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
  },
});

module.exports = mongoose.model("User", userSchema);
