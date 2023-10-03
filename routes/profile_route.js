const express = require("express");

const router = express.Router();

const {
  getBasicInfo,
  getInvestments,
  getTransactions,
  getBasicInfoForAdminByEmail,
  getDocuments,
  // getReports,
  getLinkedAccounts,
  getBasicInfoForAdminById,
} = require("../controllers/profile_controller");

const authenticateUser = require("../middleware/authentication");

// const profileMiddleware = require("../middleware/profile_middleware");

router.get("/get_basic_info", authenticateUser, getBasicInfo);
router.get("/get_basic_info_admin", getBasicInfoForAdminByEmail);
router.get("get_basic_info_admin_id", getBasicInfoForAdminById);
router.get("/get_basic_info", authenticateUser, getBasicInfo);
router.get("/investments", authenticateUser, getInvestments);
router.get("/transactions", authenticateUser, getTransactions);
router.get("/documents", authenticateUser, getDocuments);
// router.get("/reports", authenticateUser, getReports);
router.get("/linked-accounts", authenticateUser, getLinkedAccounts);

module.exports = router;
