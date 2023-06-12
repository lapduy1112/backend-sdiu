const express = require("express");
const studentController = require("../controllers/studentController");
const router = express.Router();
const jwtAuth = require("../middlewares/jwtAuth");


router.get("/updatepassword", jwtAuth, studentController.updatePassword);
