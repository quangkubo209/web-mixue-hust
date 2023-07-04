const Admin = require("../models/Admin");
const { registerValidation } = require("../utils/validation");
const bcrypt = require("bcryptjs");

exports.createStaff = async(body, image) => {
    const{username, password, name, role} = body;

    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) return res.status(400).send("username already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newStaff = await Admin.create({
        username, password, name, role, image,
    });

    await newStaff.save();
    return newStaff;
}

exports.getAllStaff = async () => {
    return await Admin.find({role: "STAFF"});
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
