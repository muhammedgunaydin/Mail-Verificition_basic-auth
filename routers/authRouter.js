const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/register", authController.createUser);
router.post("/login", authController.loginUser);
router.post("/update", authController.updateUser);


module.exports = router;