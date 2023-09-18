const mongoose = require("mongoose");

const interestedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "Email already exists"],
  },

  message: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Interested = mongoose.model("Interested", interestedSchema);

module.exports = Interested;
