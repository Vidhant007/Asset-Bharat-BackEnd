const Interested = require("../models/interested_model.js");

const { StatusCodes } = require("http-status-codes");

const createInterested = async (req, res) => {
  const interested = await Interested.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({ interested });
};

const getInterested = async (req, res) => {
  const interested = await Interested.find({});
  res.status(StatusCodes.OK).json({ interested, count: interested.length });
};

module.exports = {
  createInterested,
  getInterested,
};
