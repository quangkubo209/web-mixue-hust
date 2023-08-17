const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 50,
  },
  fullname: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  email: {
    type: String,
    pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1, 2],
    default: -1,
  },
  dob: {
    type: Date,
  },
  phoneNumber: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 11,
  },
  level: {
    type: String,
    enum: ["bronze", "silver", "gold", "diamond"],
    default: "bronze",
  },
  avatarPath: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum:["ADMIN", "USER"],
    default: "USER",
    uppercase: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
