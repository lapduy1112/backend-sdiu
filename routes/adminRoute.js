const express = require("express");
const jwtAuth = require("../middlewares/jwtAuth");
const Admin = require("../models/Admin");
const Student = require("../models/Student");
const adminController = require("../controllers/adminController");
const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");
const router = express.Router();

const checkExistUser = catchAsync(async (req, res, next) => {
  var username = req.params.username;
  var role = req.body.role;
  var existUser = null;
  if (role == "STUDENT") {
    existUser = await Student.findOne({ username: username });
  } else {
    existUser = await Admin.findOne({ username: username });
  }
  if (existUser != null) {
    next();
  } else {
    throw new ApiError(401, "User is not exist");
  }
});
router.post("/createadmin", jwtAuth, adminController.createAdmin);
router.post("/createstudent", jwtAuth, adminController.createStudent);
router.delete(
  "/deleteuser/:username",
  jwtAuth,
  checkExistUser,
  adminController.deleteUser
);
router.patch("/updatepassword", jwtAuth, adminController.updatePassword);

module.exports = router;
