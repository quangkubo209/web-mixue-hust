const ProductModel = require("../models/Product");
const SizeSchema = require("../models/variation/Size");
const ToppingModel = require("../models/variation/Topping");
const CategoryModel = require("../models/variation/Category");
const { default: mongoose } = require("mongoose");

exports.getAllProducts = async () => {
  const response = await ProductModel.find({})
    .populate({
      path: "category",
      select: "title",
    })
    .populate({
      path: "sizeList.sizeId",
      select: "size price",
    })
    .populate({
      path: "toppingList.toppingId",
      select: "name price",
    });
  // .populate("category").populate("toppingList.toppingId").populate("sizeList.sizeId");
  return response;
};
// exports.addProduct = async (product) => {
//     return await ProductModel.create(product);
// }

exports.addProduct = async (body) => {
  console.log("body: ", body);
  const {
    name,
    description,
    category,
    basePrice,
    sizeList,
    toppingList,
    image,
  } = body;

  const newProduct = await ProductModel.create({
    name,
    description,
    category,
    basePrice,
    image,
    sizeList,
    toppingList,
    sizeList,
  });

  const sizeListId = [];
  const categoryArray = [];
  if (sizeList) {
    const variationData = await Promise.all(
      sizeList.map(async (size) => {
        const createdSize = await SizeSchema.create(size);
        sizeListId.push({ sizeId: createdSize._id });
      })
    );
  }
  const toppingListId = [];

  await toppingList.map((tp) => {
    toppingListId.push({ toppingId: tp });
  });

  newProduct.sizeList = sizeListId;
  newProduct.toppingList = toppingListId;
  // newProduct.category = categoryArray;

  console.log("new product: ", newProduct);
  await newProduct.save();

  return newProduct;
};

exports.updateProductById = async (id, product) => {
  return await ProductModel.findByIdAndUpdate(id, product, {
    new: true,
    runValidators: true,
  });
};

exports.getProductById = async (id) => {
  return await ProductModel.findById(id)
    .lean()
    .populate({
      path: "category",
      select: "title",
    })
    .populate({
      path: "sizeList.sizeId",
      select: "size price",
    })
    .populate({
      path: "toppingList.toppingId",
      select: "name price",
    });
};

exports.deleteProduct = async (id) => {
  return await ProductModel.findByIdAndDelete(id);
};

exports.getALlToping = async () => {
  return await ToppingModel.find({});
};

exports.getAllCategory = async () => {
  return await CategoryModel.find({});
};

exports.countProduct = async () => {
  return await ProductModel.countDocuments();
};
