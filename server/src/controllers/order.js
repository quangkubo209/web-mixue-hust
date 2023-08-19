const orderService = require("../services/order");

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json({ data: orders, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.json({ _id: order._id, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrderByCustomerId = async (req, res) => {
    try {
        const order = await orderService.getOrderByCustomerId(req.params.customerId);
        res.json({ data: order, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await orderService.updateOrder(req.params.id, req.body);
        res.json({ data: order, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await orderService.deleteOrder(req.params.id);
        res.json({ data: order, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
