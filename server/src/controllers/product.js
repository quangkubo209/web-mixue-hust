const productService = require("../services/product");

getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
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
    console.log(req.file);
    console.log(req.body);
    // const product = await productService.addProduct(req.body);
    // res.json({ data: product, status: "success" });
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

updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
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
    console.log(req.params.id);
    const product = await productService.deleteProduct(req.params.id);
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
