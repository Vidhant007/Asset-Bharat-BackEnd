const mongoose = require("mongoose");

require("dotenv").config();

const shareSchema = new mongoose.Schema({
  valueInRupees: {
    type: Number,
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Share = mongoose.model("Share", shareSchema);

module.exports = Share;
