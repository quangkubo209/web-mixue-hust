const { countProduct } = require("../services/product");
const { countUser } = require("../services/user");
const { countOrder } = require("../services/order");

exports.countSome = async (req, res) => {
  console.log("countSome");
  try {
    const productNum = await countProduct();
    const userNum = await countUser();
    const orderNum = await countOrder();
    res.json({
      data: {
        productNum,
        userNum,
        orderNum,
      },
      status: "success",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
