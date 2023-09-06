const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({ message: " 404!! Not found" });
};

module.exports = notFoundMiddleware;
