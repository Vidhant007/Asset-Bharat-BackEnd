const User = require("../models/user_model");
const Property = require("../models/property_model");
const Share = require("../models/share_model");

const authenticationMiddleware = require("../middleware/authentication");

const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");

const createSharesForProperty = async (
  propertyId,
  numberOfShares,
  shareValueinRupees,
  originalOwner
) => {
  try {
    // Retrieve the property from the database
    const property = await Property.findById(propertyId);
    if (!property) {
      throw new NotFoundError("Property not found");
    }

    const shares = [];

    let serialNumber = 1;

    for (let i = 0; i < numberOfShares; i++) {
      const share = new Share({
        serialNumber: serialNumber,
        valueInRupees: shareValueinRupees,
        property: propertyId,
        originalOwner: originalOwner,
        currentOwner: originalOwner,
      });
      shares.push(share);

      serialNumber++;
    }

    const createdShares = await Share.insertMany(shares);
    console.log("Shares created successfully:", createdShares.length);
  } catch (error) {
    console.error("Error creating shares:", error);
  }
};

const createProperty = async (req, res) => {
  res.send("create property");
};

const createPropertywithShares = async (req, res) => {
  req.body.originalOwner = req.user.userId;

  const highlightedImages = req.files.map((file) => {
    return `http://localhost:3000/${file.filename}`;
  });

  req.body.highlightedImages = highlightedImages;

  const property = await Property.create(req.body);

  await createSharesForProperty(
    property._id,
    property.numberOfShares,
    property.shareValueinRupees,
    property.originalOwner
  );

  const populatedProperty = await Property.findById(property._id).populate(
    "originalOwner",
    "-password -shares -createdAt -updatedAt -__v -googleId"
  );

  res.status(StatusCodes.CREATED).json({ property: populatedProperty });
};
// GET LISTED PROPERTIES

const getListedProperties = async (req, res) => {
  const properties = await Property.find({ listed: true });

  res.status(StatusCodes.OK).json({ properties: properties });
};
// GET SHARES FOR A PROPERTY

const getShares = async (req, res) => {
  const {
    params: { id: propertyId },
  } = req;

  const shares = await Share.find({ property: propertyId });

  if (!shares) {
    throw new BadRequestError("The given property or it's shares don't exist");
  }

  res.status(StatusCodes.OK).json({ shares });
};

//gettting property by id
const getPropertyById = async (req, res) => {
  try {
    const { id } = req.query;

    // Find the property by ID
    const property = await Property.findById(id);

    if (!property) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Property not found" });
    }

    res.status(StatusCodes.OK).json({ property });
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
const buyShares = async (req, res) => {
  const {
    params: { propertyId },
    body: { numberOfShares },
    user: { userId },
  } = req;

  try {
    const property = await Property.findById(propertyId);

    if (!property) {
      throw new BadRequestError("The given property or its shares don't exist");
    }

    const unboughtShares = await Share.find({
      property: propertyId,
      $expr: { $eq: ["$currentOwner", "$originalOwner"] },
    })
      .sort({ serialNumber: 1 })
      .lean();

    if (unboughtShares.length < numberOfShares) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Not enough shares available to purchase" });
    }

    const sharesToBuy = unboughtShares.slice(0, numberOfShares);

    const bulkWrites = sharesToBuy.map((share) => ({
      updateOne: {
        filter: { _id: share._id },
        update: {
          $set: {
            currentOwner: userId,
          },
          $push: {
            ownershipHistory: {
              number: share.ownershipHistory.length + 1,
              owner: `${userId}`,
            },
          },
        },
      },
    }));

    const bulkWritesUser = sharesToBuy.map((share) => ({
      updateOne: {
        filter: { _id: userId },
        update: {
          $push: {
            sharesBought: {
              shareId: share._id,
              propertyId: propertyId,
            },
          },
        },
      },
    }));

    const result = await Share.bulkWrite(bulkWrites);

    const resultUser = await User.bulkWrite(bulkWritesUser);

    if (result.modifiedCount !== sharesToBuy.length) {
      throw new BadRequestError("Failed to update shares");
    }

    if (resultUser.modifiedCount !== sharesToBuy.length) {
      throw new BadRequestError("Failed to update shares");
    }

    const updatedShares = await Share.find({
      _id: { $in: sharesToBuy.map((share) => share._id) },
    });

    // Sort the updated shares by serial number
    updatedShares.sort((a, b) => a.serialNumber - b.serialNumber);

    const listofBoughtShares = updatedShares.map((share) => share.toObject());

    const totalPrice = listofBoughtShares.reduce((total, share) => {
      return total + share.valueInRupees;
    });

    res.json({ shares: listofBoughtShares, totalValueOfShares: totalPrice });
  } catch (error) {
    console.error("Error buying shares:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// const currentOwner = shares[0].currentOwner;

// listOfShares = [];

// for (let i = 0; i < shares.length; i++) {
//   const share = shares[i];

//   share.currentOwner = userId;
//   if (!(share.currentOwner in share.ownershipHistory)) {
//     share.ownershipHistory.push({
//       number: share.ownershipHistory.length + 1,
//       owner: `${currentOwner}`,
//     });
//     listOfShares.push(share);
//     await share.save();
//   }

//   const totalPrice = shares.reduce((total, share) => {
//     return total + share.valueInRupees;
//   }, 0);

//   res.json({
//     message: "Shares bought successfully",
//     totalPriceOfSelectedShares: `Rs. ${totalPrice} `,
//     listOfShares: listOfShares,
// });
// }
// };

const getFundedProperties = async (req, res) => {
  const properties = await Property.find({ funded: true });

  res.status(StatusCodes.OK).json({ properties: properties });
};

module.exports = {
  getListedProperties,
  createPropertywithShares,
  createProperty,
  getShares,
  getPropertyById,
  getFundedProperties,
  buyShares,
};

TODO: "get full user when getting listed properties";

TODO: "implement LEAN in mongoose queries to improve performance";

TODO: "Add CACHING to the application to improve performance and reduce load on the database";

TODO: "Add pagination to the application to improve performance and reduce load on the database";

TODO: "Add search functionality to the application to improve performance and reduce load on the database";

TODO: "Add sorting functionality to the application to improve performance and reduce load on the database";

TODO: "Add more error handling and new errors to the application";
