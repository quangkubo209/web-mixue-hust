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

  console.log("basePrice: ", basePrice);


  if (!name)
    return {
        type: "ERROR",
        message: "name field is required",
        statusCode: 400,
    };

  if (basePrice === '0')
    return {
        type: "ERROR",
        message: "basePrice field is required",
        statusCode: 400,
    };

  if (image === 'undefined')
    return {
        type: "ERROR",
        message: "image field is required",
        statusCode: 400,
    };

  var newProduct = {};
  if(toppingList){
    newProduct = await ProductModel.create({
      name,
      description,
      category,
      basePrice,
      image,
      sizeList,
      toppingList,
      sizeList,
    });
  }
  else {
     newProduct = await ProductModel.create({
      name,
      description,
      category,
      basePrice,
      image,
      sizeList,
      // toppingList,
      sizeList,
    });
  }
  // const newProduct = await ProductModel.create({
  //   name,
  //   description,
  //   category,
  //   basePrice,
  //   image,
  //   sizeList,
  //   toppingList,
  //   sizeList,
  // });

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
  if(toppingList){ 
    console.log("vao duoc nua roi");
     const toppingListId = [];

    await toppingList.map((tp) => {
      toppingListId.push({ toppingId: tp });
    });
  
    newProduct.toppingList = toppingListId;}

  newProduct.sizeList = sizeListId;
  // newProduct.category = categoryArray;

  console.log("new product: ", newProduct);
  await newProduct.save();

  return {
    type: "SUCCESS",
    message: "Add product successfully!",
    statusCode: 200,
    product: newProduct,
};
};

exports.updateProductById = async (id, product) => {
  return await ProductModel.findByIdAndUpdate(id, product, {
    new: true,
    runValidators: true,
  });
};

exports.getProductById = async (id) => {
  const productGetById = await  ProductModel.findById(id)
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

    if (!productGetById)
    return {
        type: "ERROR",
        message: "No product found!",
        statusCode: 404,
    };

    return {
      product : productGetById,
      type: "SUCCESS", 
      statusCode: 200,
      message : " Found ",

    }
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
