const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../utils/validation");
const Authorize = require("../middleware/authorize");
const adminController = require("../controllers/admin");
const restrictedTo = require("../middleware/restrictedTo");
const multer = require("multer");


const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        "." +
        file.mimetype.split("/")[1]
    );
  },
  encoding: "7bit",
});

// const storage = multer.memoryStorage();



const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

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


router.use(Authorize);

router.get("/token", adminController.getUserByToken);

// router.post(
//   "/",
//   restrictedTo(["ADMIN"]),
//   uploadSingleFile("image"),
//   adminController.createStaff
// );


router.route("/").post( restrictedTo("ADMIN"), upload.single("image"), adminController.createStaff);

router.get("/:id",  adminController.getUserById);
router.get("/", restrictedTo("ADMIN"), adminController.getAllStaff)
router.patch("/update-user",   adminController.updateUser);
router.delete("/:id", restrictedTo("ADMIN"), adminController.deleteUser);



module.exports = router;
