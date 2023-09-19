const mongoose = require("mongoose");

const lotOwnershipSchema = new mongoose.Schema({
  lotNumber: {
    // the first 5 digits of lot number define the property and the next 5 digits define the lot number
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming you're using ObjectId for user IDs
    required: true,
  },
  transactionId: {
    type: String, // Optional: Store the transaction ID if needed
    trim: true,
  },
});

const LotOwnership = mongoose.model("LotOwnership", lotOwnershipSchema);

module.exports = LotOwnership;
