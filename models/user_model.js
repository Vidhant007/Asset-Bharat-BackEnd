const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },

  mobileNumber: {
    type: String,
    required: [true, "Please enter your mobile number"],
    trim: true,
    unique: true,
    minLength: [10, "Your mobile number must be 10 characters long"],
    maxLength: [10, "Your mobile number must be 10 characters long"],
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    trim: true,
    minLength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },

  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
    trim: true,
    maxLength: [30, "Your first name cannot exceed 30 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name"],
    trim: true,
    maxLength: [30, "Your last name cannot exceed 30 characters"],
  },
  shares: {
    type: mongoose.Schema.ObjectId,
    ref: "Shares",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  googleId: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema
  .virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

userSchema.path("password").validate(function (value) {
  if (this.password !== this.confirmPassword) {
    if (value !== this.confirmPassword) {
      this.invalidate("confirmPassword", "Passwords must match");
    }
  }
  return true;
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

userSchema.methods.matchPasswords = async function (cadidatePassword) {
  return await bcrypt.compare(cadidatePassword, this.password);
};

userSchema.methods.getPublicProfile = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
