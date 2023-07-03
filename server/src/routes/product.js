const express = require("express");

const {
  getAllProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { updateProductById } = require("../services/product");

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(addProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProduct);

module.exports = router;
