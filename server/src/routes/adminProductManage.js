const router = require("express").Router();
const Authorize = require("../middleware/authorize");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/images");
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
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

//sử dụng midelware để xác thực quyền truy cập của admin.
router.use(Authorize);

// router
//   .route("/")
//   .get(getAllProducts)
//   .post(upload.single("image"), (req, res) => {
//     console.log(req.file);
//     console.log(JSON.parse(req.body.variations));
//     res.json({ message: "create succesfully!!!" });
//   }, addProduct);

router
  .route("/")
  .get(getAllProducts)
  .post(upload.single("image"), addProduct);
  
router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
