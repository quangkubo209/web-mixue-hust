const userService = require("../services/user");
const User = require("../models/User");
const { registerValidation } = require("../utils/validation");
const bcrypt = require("bcryptjs");



exports.createUser =  async(req, res) => {
    try{
        const {username, password, name, role } = req.body;
        const image = req.file.filename;
        const {error} = registerValidation({username, password});
        if(error) return res.status(400).send(error.details[0].message);

        const usernameExists = await User.findOne({ username: req.body.username });
        if (usernameExists) return res.status(400).send("username is existed");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({
            username, password: hashedPassword, role, name, profileImage: image
        });

        await newUser.save();


        res.json({data: newUser, status: "success"});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json({ data: users, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await productService.updateUser(req.params.id, req.body);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserByToken = async (req, res) => {
    try {
      const userId = req.user._id; 
      const user = await userService.getUserById(userId); 
  
      res.json({ data: user, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

