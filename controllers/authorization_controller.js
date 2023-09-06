const User = require("../models/user_model");

const { StatusCodes } = require("http-status-codes");

const { BadRequestError, UnauthenticatedError } = require("../errors");

const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ user: user.getPublicProfile(), token: token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password"); // why did you add .select("+password") here? // because we have set select: false in the user model for password // so we need to explicitly select the password
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  if (!user) {
    throw new UnauthenticatedError("Email ID doesnt exist, Create an account");
  }

  const isPasswordCorrect = await user.matchPasswords(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Email or Password is incorrect");
  }

  // console.log(req.cookies.jwt);

  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user: user.getPublicProfile(), token: token });
};

const logoutUser = async (req, res) => {
  res.send("logout user"); // do I need to add anything here? // no // so the user will be logged out automatically when the token expires? // yes // okay so the logout function will be set in the front-end part? // yes
};

module.exports = { registerUser, loginUser };
