const express = require("express");
const {
    getAllProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/product");

const router = express.Router();

router.route("/").get(getAllProducts).post(addProduct);
router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;
