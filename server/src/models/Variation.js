const { mongoose } = require("mongoose");

const variationSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
        enum: ["S", "M", "L"]
    },
    price: {
        type: Number,
        required: true,
        max: 999999
    }
});

module.exports = mongoose.model("Variation", variationSchema);
