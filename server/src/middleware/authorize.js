const CustomErrorHandler = require("../utils/CustomErrorHandler");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Admin = require("../models/Admin");


module.exports = async (req, res, next) => {
    try {
        //get token from header
        const authorization = req.headers.authorization;
        const token = authorization && authorization.split(" ")[1];

        if (!token) return next(new CustomErrorHandler(401, "Please login!"));

        //decode token
        const decoded = jwt.verify(token, config.jwt.jwt_secret);

        const user = await Admin.findById(decoded.id).select(
            "username password"
        );

        if (!user)
            return next(
                new CustomErrorHandler(
                    401,
                    "User belonging to this token does not exist!"
                )
            );

        // if (user.isChangePasswordAfter(decoded.iat))
        //     return next(
        //         new CustomErrorHandler(
        //             401,
        //             "Password was changed, please login again!"
        //         )
        //     );

        req.user = user;
        next();
    } catch (err) {
        next(new CustomErrorHandler(401, err.message));
    }
};
