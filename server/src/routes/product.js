const express = require("express");
const router = express.Router();
const Authorize = require("../middleware/authorize");
const multer = require("multer");
const mongoose = require("mongoose");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       Date.now() +
//         "-" +
//         Math.round(Math.random() * 1e9) +
//         "." +
//         file.mimetype.split("/")[1]
//     );
//   },
//   encoding: "7bit",
// });

// // const storage = multer.memoryStorage();

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: (req, file, cb) => {
//     // reject a file
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   },
// });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  getAllProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProduct,
  getALlToping,
  getAllCategory,
  countProduct,
} = require("../controllers/product");
const imgurUploadImage = require("../middleware/imgurUpload");
const { uploadAnyFile } = require("../utils/multer");
const uploadFile = require("../middleware/uploadFile");

//sử dụng midelware để xác thực quyền truy cập của admin.
router.use(Authorize);

router
  .route("/")
  .get(getAllProducts)
  .post(
    upload.single("image"),
    imgurUploadImage,
    (req, res, next) => {
      console.log("req.body: ", req.body.sizeList);
      req.body.sizeList = JSON.parse(req.body.sizeList);
      const CategoryTitles = [];
      req.body.category.split(",").map((cate) => {
        var jsonString = '{"title": "' + cate + '"}';
        CategoryTitles.push(JSON.parse(jsonString));
      });
      req.body.category = CategoryTitles;

      const toppingListId = [];
      // req.body.filePath = req.file.filename;
      const objectIdArray = req.body.toppingList
        .split(",")
        .map((id) => mongoose.Types.ObjectId(id.trim()));

      // newProduct.toppingList.toppingId = objectIdArray;
      req.body.toppingList = objectIdArray;

      next();
    },
    addProduct
  );

router.route("/get-topping").get(getALlToping);
router.route("/get-category").get(getAllCategory);
router.route("/:id").get(getProductById).delete(deleteProduct);

router.route("/update-product/:productId").patch(
  upload.single("image"),
  (req, res, next) => {
    // req.body.sizeList = JSON.parse(req.body.sizeList);
    // const CategoryTitles = [];
    // req.body.category.split(",").map((cate)=> {
    //      var jsonString = '{"title": "' + cate + '"}';
    //       CategoryTitles.push(JSON.parse(jsonString));
    // })
    // req.body.category = CategoryTitles;

    // const toppingListId = [];
    // // req.body.filePath = req.file.filename;
    // const objectIdArray = req.body.toppingList
    // .split(",")
    // .map((id) => mongoose.Types.ObjectId(id.trim()));

    // req.body.toppingList = objectIdArray;

    next();
  },
  updateProductById
);
router.route("/count", countProduct);
module.exports = router;
