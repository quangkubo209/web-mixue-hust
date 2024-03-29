const UserModel = require("../models/User");

exports.getAllUsers = async () => {
  return await UserModel.find({});
};

exports.getUserById = async (id) => {
  return await UserModel.findById(id);
};

exports.updateUser = async (id, user) => {
  return await UserModel.findByIdAndUpdate(id, user);
};

exports.deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};

exports.countUser = async () => {
  return await UserModel.countDocuments();
};
