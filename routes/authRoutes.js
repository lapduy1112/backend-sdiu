const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/adminlogin", authController.adminLogin);
router.post("/studentlogin", authController.studentLogin);
module.exports = router;
