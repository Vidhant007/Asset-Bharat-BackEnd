const express = require("express");

const router = express.Router();

const {
  googleLoginUser,
  googleLoginUserCallback,
} = require("../controllers/authorization_controller");

router.route("/google").get(googleLoginUser);
router.route("/google/callback").get(googleLoginUserCallback);

module.exports = router;
