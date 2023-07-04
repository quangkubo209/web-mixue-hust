const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Admin = require("../models/Admin");
const CustomErrorHandler = require("../utils/CustomErrorHandler");

module.exports = async (req, res, next) => {
  try {
    //get token from header
    const authorization = req.headers.authorization;
    const token = authorization && authorization.split(" ")[1];

    if (!token) {
      return next(new CustomErrorHandler(401, "Please login!"));
    }

    //decode token
    const decoded = jwt.verify(token, config.jwt.jwt_secret);

    const admin = await Admin.findById(decoded.id).select("username password");
    
    if (!admin) {
    console.log("no find ");
      return next(
        new CustomErrorHandler(
          401,
          "User belonging to this token does not exist!"
        )
      );
    }

    req.user = admin;
    next();
  } catch (err) {
    return new CustomErrorHandler(401, err.message);
  }
};
