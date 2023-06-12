const mongoose = require("mongoose");
const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/sdiu")
    .then(() => {
      console.log("connect database success");
    })
    .catch((err) => console.log("can not connect to database"));
};
module.exports = connectDB;
