const { mongoose } = require("mongoose");

const sizeSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
    },
    
    price: {
        type: Number,
        required: true,
        max: 999999
    }
});

module.exports = mongoose.model("Size", sizeSchema);