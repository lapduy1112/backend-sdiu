const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
      minlength: [6, "must be at least 3 characters"],
      maxlength: [30, "must be at least 30 characters"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add Password"],
      minlength: [6, "must be at least 3 characters"],
      maxlength: [30, "must be at least 30 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'STUDENT'],
      required: [true, "role is required"],
    },
  },
  {
    collection: "nb-users",
    timestamps: true,
  }
);
UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
    next();
  }
});
module.exports = mongoose.model("User", UserSchema);
