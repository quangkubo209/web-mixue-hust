const { mongoose } = require("mongoose");

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    }
});

module.exports = mongoose.model('Admin', AdminSchema, "adminTable");




