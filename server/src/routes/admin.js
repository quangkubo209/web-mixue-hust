const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginValidation, registerValidation } = require("../utils/validation");

// router.post('/register', async (req, res) => {
//     const { error } = registerValidation(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const usernameExists = await Admin.findOne({ username: req.body.username });
//     if (usernameExists) return res.status(400).send("username already exists");

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     const user = new Admin({
//         username: req.body.username,
//         password: hashedPassword,
//     });

//     try {
//         await user.save();
//         // res.send({ id: user._id });
//         res.status(200).json({message:"create succesfully!!!", user});
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });

router.post("/login", async (req, res, next) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const admin = await Admin.findOne({ username: req.body.username });
    if (!admin) return res.status(400).send("account not found");

    //kiểm tra password
    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!validPassword) return res.status(400).send("invalid password");

    //sau khi đăng nhập thành công thì tạo ra 1 token.
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // res.header('TOKEN', token).send(token);
    res
      .status(200)
      .json({ success: true, message: "Log in succesfully", admin, token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
