const OrderModel = require("../models/Order");

exports.getAllOrders = async () => {
    return await OrderModel.find({});
}

exports.getAllOrders = async () => {
    const response = await OrderModel.find({})
      .populate({
        path: "orderLine.sizeProduct",
        select: "size price",
      })
      .populate({
        path: "orderLine.products",
        select: "name",
      })
      .populate({
        path: "orderLine.toppingList.toppingId",
        select: "name price",
      })
      .populate({
        path: "customerId",
        select: "fullname",
      });

    // .populate("category").populate("toppingList.toppingId").populate("sizeList.sizeId");
    return response;
  };

exports.createOrder = async (order) => {
    return await OrderModel.create(order);
}

exports.getOrderByCustomerId = async (customerId) => {

    return await OrderModel.find({}).where ("customerId").equals(customerId);
}

exports.updateOrder = async (id, order) => {
    return await OrderModel.findByIdAndUpdate(id, order);
}

exports.deleteOrder = async (id) => {
    return await OrderModel.findByIdAndDelete(id);
}