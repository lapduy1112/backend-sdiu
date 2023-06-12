const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/ApiError");
const Admin = require("../models/Admin");

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { username, password, newPassword } = req.body;
  const admin = await Admin.findOne({ username });
  const isMatch = bcyptjs.compareSync(password, admin.password);
    if (!isMatch) {
      throw new ApiError(400, "Old password is not correct");
    } else {
      admin.password = newPassword;
      await admin.save();
      res.status(200).json({ success: true });
    }
});

