const express = require("express");

const router = express.Router();

const {
  getBasicInfo,
  getInvestments,
  getTransactions,
  getDocuments,
  getReports,
  getLinkedAccounts,
} = require("../controllers/profile_controller");

const authenticateUser = require("../middleware/authentication");

// const profileMiddleware = require("../middleware/profile_middleware");

router.get("/getname_amount", authenticateUser, getBasicInfo);
router.get("/investments", authenticateUser, getInvestments);
router.get("/transactions", authenticateUser, getTransactions);
router.get("/documents", authenticateUser, getDocuments);
router.get("/reports", authenticateUser, getReports);
router.get("/linked-accounts", authenticateUser, getLinkedAccounts);

module.exports = router;
