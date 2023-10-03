const mongoose = require("mongoose");

require("dotenv").config();

const shareSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },

  valueInRupees: {
    type: Number,
    required: true,
  },

  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },

  originalOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  currentOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  ownershipHistory: {
    type: Array,
    required: true,
    default: function () {
      return [
        {
          number: 1,
          owner: this.originalOwner,
        },
      ];
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

shareSchema.pre("save", async function (next) {
  const lastShare = await this.constructor.findOne(
    {},
    {},
    { sort: { shareNumber: -1 } }
  );
  this.shareNumber = lastShare ? lastShare.shareNumber + 1 : 1;
  next();
});

shareSchema.virtual("shareNumberFormatted").get(function () {
  return `Share Number : ${this.shareNumber}`;
});

const Share = mongoose.model("Share", shareSchema);

module.exports = Share;
