const express = require("express");
const router = express.Router();
const Authorize = require("../middleware/authorize");
const multer = require("multer");
const mongoose = require('mongoose');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        "." +
        file.mimetype.split("/")[1]
    );
  },
  encoding: "7bit",
});

// const storage = multer.memoryStorage();



const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const {
  getAllProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProduct,
  getALlToping,
  getAllCategory
} = require("../controllers/product");

//sử dụng midelware để xác thực quyền truy cập của admin.
router.use(Authorize);


router.route("/").get(getAllProducts).post(upload.single("image"), (req, res, next) => {
  req.body.sizeList = JSON.parse(req.body.sizeList);
   var jsonString = '{"title": "' + req.body.category + '"}';
  req.body.category = JSON.parse(jsonString);

  const toppingListId = [];
  // req.body.filePath = req.file.filename;
  const objectIdArray = req.body.toppingList
  .split(",")
  .map((id) => mongoose.Types.ObjectId(id.trim()));
  console.log("array topping: ", objectIdArray);

// newProduct.toppingList.toppingId = objectIdArray;
  req.body.toppingList = objectIdArray;
  // objectIdArray.map(ob => req.body.toppingList.toppingId = ob);
  console.log("Req.body: ", req.body);

  next(); 
  },  addProduct);
  
router.route("/get-topping").get(getALlToping);
router.route("/get-category").get(getAllCategory);
router
  .route("/:id")
  .get(getProductById)
  .delete(deleteProduct);





router.route("update-product/:productId").patch(upload.single("image"), (req, res, next) => {
  req.body.sizeList = JSON.parse(req.body.sizeList);
  // req.body.filePath = req.file.filename;

  next(); 
  },updateProductById);

module.exports = router;
