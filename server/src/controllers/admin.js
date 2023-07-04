const Admin = require("../models/Admin");
const adminService = require("../services/admin");
const { registerValidation } = require("../utils/validation");
const bcrypt = require("bcryptjs");


exports.createStaff =  async(req, res) => {
    try{
        console.log(req.file);
        // const newUser = await adminService.createStaff(req.body, req.file.filename);
        const {username, password, name, role } = req.body;
        const image = req.file.filename;
        const {error} = registerValidation({username, password});
        if(error) return res.status(400).send(error.details[0].message);

        const usernameExists = await Admin.findOne({ username: req.body.username });
        if (usernameExists) return res.status(400).send("username is existed");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newStaff = await Admin.create({
            username, password: hashedPassword, role, name, profileImage: image
        });

        await newStaff.save();


        res.json({data: newStaff, status: "success"});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

// exports.createStaff = async(body, image) => {
//     const{username, password, name, role} = body;

//     const {error} = registerValidation(body);
//     // if(error) return res.status(400).send(error.details[0].message);
//     if(error) return error.details[0].message;

//     const usernameExists = await User.findOne({ username: body.username });
//     if (usernameExists) return "username is existed";

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(body.password, salt);

//     const newStaff = await Admin.create({
//         username, hashedPassword, name, role, image,
//     });

//     await newStaff.save();
//     return newStaff;
// }

exports.getAllStaff = async (req, res) => {
    try {
        const users = await adminService.getAllStaff();
        await users.forEach(user => {
            user.profileImage = `http://localhost:4001/uploads/${user.profileImage}`;
          });
        res.json({ data: users, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await adminService.getUserById(req.params.id);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await adminService.updateUser(req.params.id, req.body);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await adminService.deleteUser(req.params.id);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserByToken = async (req, res) => {
    try {
      const userId = req.user._id; 
      const user = await adminService.getUserById(userId); 
  
      console.log("user: ", user);
      res.json({ data: user, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

