const User = require("../models/User");
const { registerValidation } = require("../utils/validation");
const bcrypt = require("bcryptjs");


exports.getAllUser = async () => {
    return await Admin.find({role: "USER"});
}

exports.getUserById = async (id) => {
    return await Admin.findById(id);
}

exports.updateUser = async (id, user) => {
    return await Admin.findByIdAndUpdate(id, user);
}

exports.deleteUser = async (id) => {
    return await Admin.findByIdAndDelete(id);
}
