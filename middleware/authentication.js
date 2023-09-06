const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const User = require("../models/user_model");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  let token = authHeader.split(" ")[1];

  if (!token && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId }; //there is no name in the user model but we can add it here and it will be added to the user object // but there is a virtual field in user model called fullName should we not use that instead? // yes we should use that instead
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = authenticationMiddleware;
