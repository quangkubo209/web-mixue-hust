const productService = require("../services/product");
const path = require('path');

getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    // console.log(products);
    // Cập nhật đường dẫn ảnh của mỗi sản phẩm
    await products.forEach(product => {
      // product.image = `http://localhost:4001/uploads/${product.image}`;
      console.log(products[0].image);
    console.log(products[0]);
    });
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

addProduct = async (req, res) => {
  try {
    // console.log(req.file);
    const product = await productService.addProduct(req.body, req.file.filename);
    console.log("req.body: ", req.body);
    // console.log(req.file);
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

updateProductById = async (req, res) => {
  try {
    const product = await productService.updateProductById(req.params.productId, req.body);
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


module.exports = {
  getAllProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProduct,
  getALlToping,
  getAllCategory
};


