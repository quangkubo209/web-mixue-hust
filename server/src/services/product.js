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

exports.addProduct = async (body, image) => {
  const { name, description, category, basePrice, sizeList, toppingList } =
    body;
  // const image = files.find((img) => img.fieldname === "image");

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

  // const sizeListId = [] ;
  if (sizeList) {
    const variationData = await Promise.all(
      sizeList.map(async (size) => {
        const createdSize = await SizeSchema.create(size);
        newProduct.sizeList.sizeId.push(createdSize._id);
      })
    );
  }
  const objectIdArray = toppingList
    .split(",")
    .map((id) => mongoose.Types.ObjectId(id.trim()));
  newProduct.toppingList.toppingId = objectIdArray;

  const objectCategory = mongoose.Types.ObjectId(category);
  newProduct.category = objectCategory;

  console.log("new category: ", newProduct.category);

  await newProduct.save();

  return newProduct;
};

exports.getProductById = async (id) => {
  return await ProductModel.findById(id).lean();
};

exports.updateProductById = async (id, product) => {
  return await ProductModel.findByIdAndUpdate(id, product);
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
