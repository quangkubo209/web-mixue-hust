const { mongoose } = require("mongoose");

const toppingSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true,  
    // },
    name: {
        type: String,
        required: true,
    },
    
    price: {
        type: Number,
        required: true,
        max: 999999
    }
});

module.exports = mongoose.model("Topping", toppingSchema);