const express = require("express");

const router = express.Router();

const uploadMiddleware = require("../middleware/upload_middleware");
const authenticationMiddleware = require("../middleware/authentication");

const {
  getListedProperties,
  createPropertywithShares,
  getShares,
  getPropertyById,
  buyShares,
} = require("../controllers/properties_controller");

router.route("/listed").get(getListedProperties);
router.route("/getproperty").get(getPropertyById);
// router.route("/createProperty").post(createProperty);
router
  .route("/createProperty")
  .post(authenticationMiddleware, uploadMiddleware, createPropertywithShares);

router.route("/getShares/:id").get(getShares);

router
  .route("/buyShares/:propertyId")
  .post(authenticationMiddleware, buyShares);

module.exports = router;
