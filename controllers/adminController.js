const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");
const Admin = require("../models/Admin");
const Student = require("../models/Student");

exports.createAdmin = catchAsync(async (req, res) => {
  const { username, password, email } = req.body;
  const admin = new Admin({
    username,
    password,
    email,
  });
  await admin.save().then(() => res.status(201).json({ success: true }));
});

exports.createStudent = catchAsync(async (req, res) => {
  const { username, password, email } = req.body;
  const student = new Student({
    username,
    password,
    email,
  });
  await student.save().then(() => res.status(201).json({ success: true }));
});

exports.deleteUser = catchAsync(async (req, res) => {
  if (req.body.role == "STUDENT") {
    await Student.deleteOne({
      username: req.params.username,
    }).then(() => {
      res.status(200).json({ success: true });
    });
  } else {
    await Admin.deleteOne({
      username: req.params.username,
    }).then(() => {
      res.status(200).json({ success: true });
    });
  }
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { username, password, newPassword } = req.body;
  const admin = await Admin.findOne({ username: username });
  const isMatch = bcyptjs.compareSync(password, admin.password);
  if (!isMatch) {
    throw new ApiError(400, "Password is not correct");
  } else {
    admin.password = newPassword;
    await admin.save();
    res.status(200).json({ success: true });
  }
});
