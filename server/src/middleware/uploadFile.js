const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ApiError = require("../utils/apiError");
const storage = multer.memoryStorage();

// function uploadFile(){

// }
// const storage = (dest) =>
//   multer.diskStorage({
//     destination: function (req, file, cb) {
//       const dir = path.join(__dirname, `../../uploads/${dest}`);
//       const parentDir = path.dirname(dir);

//       if (!fs.existsSync(parentDir)) {
//         fs.mkdirSync(parentDir, { recursive: true });
//       }

//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir);
//       }

//       cb(null, dir);
//     },
//     filename: function (req, file, cb) {
//       cb(
//         null,
//         `${Date.now()}-${Math.round(Math.random() * 1e9)}.${
//           file.mimetype.split("/")[1]
//         }`
//       );
//     },
//   });

// function uploadFile(dest) {
//   return multer({
//     storage: storage(dest),
//     limits: {
//       fileSize: 1024 * 1024 * 50, // 5MB
//     },
//     fileFilter: function (req, file, cb) {
//       // const ext = path.extname(file.originalname);
//       // if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
//       //   return cb(new Error("Only images are allowed"));
//       //  }
//       // cb(null, true);
//       if (file.size > 1024 * 1024 * 50) {
//         return cb(ApiError.status(413).message("File exceeds 5MB"));
//       } else cb(null, true);
//     },
//   });
// }

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