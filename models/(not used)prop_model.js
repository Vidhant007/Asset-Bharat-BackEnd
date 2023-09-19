const mongoose = require("mongoose");

const propSchema = new mongoose.Schema(
  {
    propName: {
      type: String,
      required: [true, "Please enter the property name"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Please enter a description"],
      trim: true,
    },
    images: [
      {
        type: String,
        required: [true, "Please upload the images"],
      },
    ],
    location: {
      // Loctaion Highlights, Coordinates
      locationHighlights: {
        type: Array,
        required: [true, "Please enter the location highlights"],
        trim: true,
        index: true,
      },
      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
    },
    details: {
      // Property Type, Property Size, Total Floors, Parking Spaces, Year Built, Cost, Funded
      size: {
        type: String,
        required: [true, "Please enter the property size"],
        trim: true,
      },
      totalFloors: {
        type: Number,
        required: [true, "Please enter the total number of floors"],
      },
      parkingSpaces: {
        type: Number,
        required: [true, "Please enter the number of parking spaces"],
      },
      yearBuilt: {
        type: Number,
        required: [true, "Please enter the year the property was built"],
        min: [1900, "Please enter a valid year"],
      },
      cost: {
        type: Number,
        required: [true, "Please enter the cost of the property"],
      },
      funded: {
        type: Number,
        required: [true, "Please enter the funded amount"],
      },
    },
    investmentReturn: {
      // Minimum Investment, Gross Entry Yield, Target IRR, Rental Yield, Rent from Existing Tenant
      minInvestment: {
        type: Number,
        required: [true, "Please enter the minimum investment size"],
      },
      grossEntryYield: {
        type: Number,
        required: [true, "Please enter the gross entry yield"],
      },
      targetIRR: {
        type: Number,
        required: [true, "Please enter the target IRR"],
      },
      rentalYield: {
        type: Number,
        required: [true, "Please enter the rental yield"],
      },
      rentFromTenant: {
        type: Number,
        required: [true, "Please enter the rent from existing tenant"],
      },
    },
    tenants: [
      {
        name: {
          type: String,
          required: [true, "Please enter the tenant name"],
          trim: true,
        },
        timePeriod: {
          type: String,
          required: [true, "Please enter the time period"],
          trim: true,
        },
        rentDetails: {
          timePeriod: String,
          rentAmount: Number,
        },
        others: {
          type: String,
          required: [true, "Please enter the other details"],
          trim: true,
        },
      },
    ],
    propFinances: {
      // Annual Report, Monthly Cashflow
      annualReport: {
        type: Array,
        required: [true, "Please upload the annual report"],
      },
      monthlyCashflow: {
        type: Array,
        required: [true, "Please upload the monthly cashflow"],
      },
    },
    legalities: {
      // Floor Plan, Investment Report, Due Diligence Report, Others
      floorPlan: {
        type: String,
        required: [true, "Please upload the floor plan"],
      },
      investmentReport: {
        type: String,
        required: [true, "Please upload the investment report"],
      },
      dueDiligenceReport: {
        type: String,
        required: [true, "Please upload the due diligence report"],
      },
      others: {
        type: String,
        required: [true, "Please enter the other details"],
        trim: true,
      },
    },
    lots_occupied: [
      {
        lotNumber: {
          // the first 5 digits of lot number define the property and the next 5 digits define the lot number
          type: String,
          required: [true, "Please enter the lot number"],
          trim: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId, // Assuming you're using ObjectId for user IDs
          required: true,
        },
      },
    ],
    remaining_lots: {
      type: Number,
      required: [true, "Please enter the remaining lots"],
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propSchema);

module.exports = Property;
