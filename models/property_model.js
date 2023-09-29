const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true, // what does trim do? Ans :
  },

  originalOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  numberOfShares: {
    type: Number,
    required: true,
    trim: true,
  },

  shareValueinRupees: {
    type: Number,
    required: true,
    trim: true,
  },

  listed: {
    type: Boolean,
    required: true,
    default: false,
  },

  address: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    // required: true,
  },

  size: {
    type: Number,
    required: true,
  },

  floors: {
    type: Number,
    required: true,
  },
  info1: {
    type: String, //short info
    required: true,
  },
  info2: {
    type: String,
    required: true, //semi-long info
  },
  info3: {
    //detailed info
    type: String,
    required: true,
  },
  funded: {
    type: Boolean,
    required: true,
  },

  // googleMapQuery: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   default: "New Delhi, India",
  // },
  // investmentOverview: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },

  // investmentReturn: {
  //   type: [
  //     {
  //       minInvestmentSize: {
  //         type: String,
  //         required: true,
  //         trim: true,
  //       },

  //       grossEntryYield: {
  //         type: String,
  //         required: true,
  //         trim: true,
  //       },
  //       targetIRR: {
  //         type: Number,
  //         required: true,
  //       },
  //       rentalYield: {
  //         type: Number,
  //         required: true,
  //       },
  //       rentFromExistingTenant: {
  //         type: Number,
  //         required: true,
  //       },
  //     },
  //   ],
  //   required: true,
  // },
  // details: {
  //   cost: {
  //     type: Number,
  //     required: true,
  //   },
  //   funded: {
  //     //create a function to calculate the amount of property funded from the shares model
  //     type: Number,
  //     required: true,
  //   },
  //   size: {
  //     type: String,
  //     required: true,
  //   },
  //   totalFloors: {
  //     type: Number,
  //     required: true,
  //   },
  //   parkingSpaces: {
  //     type: Number,
  //     required: true,
  //   },
  //   yearBuilt: {
  //     type: Number,
  //     required: true,
  //   },
  // },
  // finances: {
  //   annualReport: {
  //     type: String,
  //     required: true,
  //   },
  //   monthlyCashFlow: {
  //     type: String,
  //     required: true,
  //   },
  //   tenantDetails: {
  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     details: {
  //       type: String,
  //       required: true,
  //     },
  //     timePeriod: {
  //       type: String,
  //       required: true,
  //     },
  //     rentDetails: {
  //       type: String,
  //       required: true,
  //     },
  //     others: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // },

  highlightedImages: {
    type: [String],
    required: true,
    // minlength: 1,
  },

  // locationHighlightsImages: {
  //   type: String,

  // },

  // legalities: {
  //   floorPlan: {
  //     type: String,
  //     required: true,
  //     trim: true,
  //   },
  //   investmentReport: {
  //     type: String,
  //     required: true,
  //     trim: true,
  //   },
  //   dueDiligenceReport: {
  //     type: String,
  //     required: true,
  //     trim: true,
  //   },
  // },
});

propertySchema.pre("save", async function (next) {
  this.price = this.numberOfShares * this.shareValueinRupees;
  next();
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
