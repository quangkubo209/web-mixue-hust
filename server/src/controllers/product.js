const productService = require("../services/product");
const path = require("path");
const CustomErrorHandler = require("../utils/CustomErrorHandler");

getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    // console.log(products);
    // Cập nhật đường dẫn ảnh của mỗi sản phẩm
    // await products.forEach(product => {
    //   product.image = `http://localhost:4001/uploads/${product.image}`;
    // });
    res.json({ data: products, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.addProduct = async (req, res) => {
//     try {
//         const product = await productService.addProduct(req.body);
//         res.json({ data: product, status: "success" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }

addProduct = async (req, res, next) => {
  try {
    const {type, message, statusCode, product} = await productService.addProduct(req.body);
    if (type === "ERROR")
      return next(new CustomErrorHandler(statusCode, message));
    // res.json({ data: product, status: "success" });
    res.status(statusCode).json({
      type,
      message,
      product,
  });
  } catch (err) {
    // res.status(500).json({ error: err.message });
    next(err);
  }
};

getProductById = async (req, res, next) => {
  try {
    const {type, message,statusCode,  product} = await productService.getProductById(req.params.id);
    // product.image = `http://localhost:4001/uploads/${product.image}`;
    if (type === "ERROR")
    return next(new CustomErrorHandler(statusCode, message));
  // res.json({ data: product, status: "success" });
  res.status(statusCode).json({
    type,
    message,
    product,
});
  } catch (err) {
    // res.status(500).json({ error: err.message });
    next(err);
  }
};

updateProductById = async (req, res) => {
  try {
    const product = await productService.updateProductById(
      req.params.productId,
      req.body
    );
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.deleteProduct = async (req, res) => {
//     try {
//         const product = await productService.deleteProduct(req.params.id);
//         res.json({ data: product, status: "success" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

deleteProduct = async (req, res) => {
  try {
    // console.log(req.params.id);
    const product = await productService.deleteProduct(req.params.id);
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

getALlToping = async (req, res) => {
  try {
    const topings = await productService.getALlToping();
    res.json({ data: topings, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

getAllCategory = async (req, res) => {
  try {
    const categories = await productService.getAllCategory();
    res.json({ data: categories, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

countProduct = async (req, res) => {
  try {
    const count = await productService.countProduct();
    res.json({ data: count, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProduct,
  getALlToping,
  getAllCategory,
  countProduct,
};
