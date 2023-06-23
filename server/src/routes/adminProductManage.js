const router = require('express').Router();
const Authorize = require('../middleware/authorize');

const {
    getAllProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/product");

//sử dụng midelware để xác thực quyền truy cập của admin.
router.use(Authorize);

router.route("/").get(getAllProducts).post(addProduct);
router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router
