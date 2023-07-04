const adminService = require("../services/admin");


exports.createStaff =  async(req, res) => {
    try{
        const newUser = await adminService.createStaff(req.body. req.file.filename);
        res.json({data: newUser, status: "success"});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.getAllStaff = async (req, res) => {
    try {
        const users = await adminService.getAllStaff();
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

