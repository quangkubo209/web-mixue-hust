const express = require("express");

const router = express.Router();
const Authorize = require("../middleware/authorize");
const { countSome } = require("../controllers/stat");
const restrictedTo = require("../middleware/restrictedTo");

// router.use(Authorize);
// restrictedTo("ADMIN")
router.get("/count", countSome);

module.exports = router;
