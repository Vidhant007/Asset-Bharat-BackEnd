const {
  getInterested,
  createInterested,
} = require("../controllers/interested_controller.js");

const express = require("express");

const router = express.Router();

router.route("/").get(getInterested).post(createInterested);

module.exports = router;
