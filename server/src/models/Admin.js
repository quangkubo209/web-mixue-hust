const { mongoose } = require("mongoose");

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
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
    },
    profileImage: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN", "STAFF"],
        default: "STAFF",
        uppercase: true,
    },

});

module.exports = mongoose.model('Admin', AdminSchema, "adminTable");



