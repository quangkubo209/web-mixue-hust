const ProductModel = require("../models/Product");

exports.getAllProducts = async () => {
    // const response =  await ProductModel.find().populate('variations', 'size price');
    const response = await ProductModel.find({}).populate("variations");
    return response;
}

// exports.addProduct = async (product) => {
//     return await ProductModel.create(product);
// }

exports.addProduct = async(product) => {
    const {name, description, category, image, basePrice} = product;
    const newProduct = await ProductModel.create({
        name, 
        description, 
        category,
        basePrice, 
        image
    });
    await newProduct.save();
    return newProduct;
}

exports.getProductById = async (id) => {
    return await ProductModel.findById(id).lean();
}

exports.updateProduct = async (id, product) => {
    return await ProductModel.findByIdAndUpdate(id, product);
}

exports.deleteProduct = async (id) => {
    return await ProductModel.findByIdAndDelete(id);
}
