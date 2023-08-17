const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ApiError = require("../utils/apiError");
const storage = multer.memoryStorage();

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50, // 5MB
  },
  fileFilter: function (req, file, cb) {
    if (file.size > 1024 * 1024 * 50) {
      return cb(ApiError.status(413).message("File exceeds 5MB"));
    } else cb(null, true);
  },
});