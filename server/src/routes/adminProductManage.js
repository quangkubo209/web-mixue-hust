const router = require("express").Router();
const Authorize = require("../middleware/authorize");
const multer = require("multer");

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
} = require("../controllers/product");

//sử dụng midelware để xác thực quyền truy cập của admin.
router.use(Authorize);

// router
//   .route("/")
//   .get(getAllProducts)
//   .post(upload.single("image"), (req, res) => {
//     console.log(req.file);
//     // console.log(JSON.parse(req.body.variations));
//     variation = JSON.parse(req.body.variations);
//     const response = await 
//     res.json({ message: "create succesfully!!!" });
//   });

router.route("/").get(getAllProducts).post(upload.single("image"), (req, res, next) => {
  req.body.variations = JSON.parse(req.body.variations);
  // req.body.filePath = req.file.filename;

  next(); 
  },  addProduct);

router
  .route("/:id")
  .get(getProductById)
  .delete(deleteProduct);


router.route("update-product/:productId").patch(upload.single("image"), (req, res, next) => {
  req.body.variations = JSON.parse(req.body.variations);
  // req.body.filePath = req.file.filename;

  next(); 
  },updateProductById);

module.exports = router;
