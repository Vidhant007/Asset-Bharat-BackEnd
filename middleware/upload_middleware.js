const multer = require("multer");

const { BadRequestError } = require("../errors");

const Property = require("../models/property_model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(
        new BadRequestError("Only jpeg, png, webp, and gif's are allowed"),
        false
      );
    }
  },
});

const uploadMiddleware = (req, res, next) => {
  upload.array("highlightedImages", 5)(req, res, function (err) {
    if (!req.files || req.files.length === 0) {
      return next(new BadRequestError("Please upload at least one image"));
    }

    if (req.files.length > 5) {
      return next(new BadRequestError("Please upload a maximum of 5 images"));
    }

    next();
  });
};
module.exports = uploadMiddleware;
