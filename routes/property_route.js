const express = require("express");

const router = express.Router();

const uploadMiddleware = require("../middleware/upload_middleware");

const {
  getListedProperties,
  createPropertywithShares,
  getShares,
} = require("../controllers/properties_controller");

router.route("/listed").get(getListedProperties);
// router.route("/createProperty").post(createProperty);
router
  .route("/createProperty")
  .post(uploadMiddleware, createPropertywithShares);

router.route("/getShares/:id").get(getShares);

module.exports = router;