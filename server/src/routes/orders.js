const express = require("express");
const {
    getAllOrders,
    createOrder,
    getOrderByCustomerId,
    updateOrder,
    deleteOrder,
} = require("../controllers/order");
const Authorize = require("../middleware/authorize");


const router = express.Router();
//middleware authentication
router.use(Authorize);

router.route("/").get(getAllOrders).post(createOrder);
router.route("/:customerId").get(getOrderByCustomerId);
router.route("/:id").put(updateOrder).delete(deleteOrder);

module.exports = router;