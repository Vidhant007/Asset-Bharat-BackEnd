const User = require("../models/user_model");
const Share = require("../models/share_model");

const {
  StatusCodes,
} = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");

// Get basic profile information
const getBasicInfo = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming userId is available in the request after authentication

    // Fetch the user's basic profile information
    const user = await User.findById(userId).select("name amount");

    if (!user) {
      throw new NotFoundError("User not found");
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.error("Error fetching basic profile info:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};

// Get user's investments
const getInvestments = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming userId is available in the request after authentication

    // Fetch the user's investments
    // You can replace this with your actual logic to get investments

    res.status(StatusCodes.OK).json({ investments: [] }); // Replace [] with actual investment data
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};

// Get user's linked accounts
const getLinkedAccounts = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming userId is available in the request after authentication

    // Fetch the user's linked accounts
    // You can replace this with your actual logic to get linked accounts

    res.status(StatusCodes.OK).json({ linkedAccounts: [] }); // Replace [] with actual linked account data
  } catch (error) {
    console.error("Error fetching linked accounts:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};

// Get user's documents
const getDocuments = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming userId is available in the request after authentication

    // Fetch the user's documents
    // You can replace this with your actual logic to get documents

    res.status(StatusCodes.OK).json({ documents: [] }); // Replace [] with actual document data
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};

// Get user's transactions
const getTransactions = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming userId is available in the request after authentication

    // Fetch the user's transactions
    // You can replace this with your actual logic to get transactions

    res.status(StatusCodes.OK).json({ transactions: [] }); // Replace [] with actual transaction data
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getBasicInfo,
  getInvestments,
  getLinkedAccounts,
  getDocuments,
  getTransactions,
};
