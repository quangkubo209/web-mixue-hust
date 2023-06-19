const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
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
    phoneNumber: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 11
    },
    level: {
        type: String,
        enum: ['bronze', 'silver', 'gold', 'diamond'],
        default: 'bronze'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema, "userTable");





