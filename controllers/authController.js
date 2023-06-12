const catchAsync = require("../middlewares/async");
const ApiErrors = require("../utils/ApiError");
const User = require("../models/User");
const bscryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// exports.register = catchAsync(async (req, res) => {
//   const { username, email, password, role } = req.body;

//   const user = await User.create({
//     username,
//     email,
//     password,
//     role,
//   });
//   res.status(201).json({
//     success: true,
//     data: user,
//   });
// });

exports.adminLogin = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const existedAdmin = await User.findOne({ username });
  if (!existedAdmin) {
    throw new ApiErrors(404, "userName or password is wrong");
  }
  const isMatched = bscryptjs.compareSync(password, existedAdmin.password);
  if (!isMatched) {
    throw new ApiErrors(404, "userName or password is wrong");
  }
  const token = jwt.sign(
    {
      username: existedAdmin.username,
      email: existedAdmin.email,
      id: existedAdmin._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.json({
    success: true,
    token: token,
  });
});

exports.studentLogin = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const existedStudent = await User.findOne({ username });
  if (!existedStudent) {
    throw new ApiErrors(404, "userName or password is wrong");
  }
  const isMatched = bscryptjs.compareSync(password, existedStudent.password);
  if (!isMatched) {
    throw new ApiErrors(404, "userName or password is wrong");
  }
  const token = jwt.sign(
    {
      username: existedStudent.username,
      email: existedStudent.email,
      id: existedStudent._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.json({
    success: true,
    token: token,
  });
});

// exports.logout = catchAsync(async (req, res, next) => {
//   res.clearCookie("token");
//   res.status(200).json({
//     success: true,
//     message: "Logged out",
//   });
// });
