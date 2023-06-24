const ProductModel = require("../models/Product");
const VariationSchema = require("../models/Variation");

exports.getAllProducts = async () => {
    // const response =  await ProductModel.find().populate('variations', 'size price');
    const response = await ProductModel.find({}).populate("variations");
    return response;
}

// exports.addProduct = async (product) => {
//     return await ProductModel.create(product);
// }

exports.addProduct = async(body, files) => {
    const {name, description, category, basePrice, variations} = body;
    // const image = files.find((img) => img.fieldname === "image");
    const image = files;

    const newProduct = await ProductModel.create({
        name, 
        description, 
        category,
        basePrice, 
        image, 
        // variations
    });

    // const variationsId = [] ;
    if(variations) {
        const variationData = await Promise.all(
            variations.map(async(variation) => {
                const createdVariation = await VariationSchema.create(variation);
                newProduct.variations.push(createdVariation);
            })
        )
    }
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
