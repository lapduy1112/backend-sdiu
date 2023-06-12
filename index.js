require("dotenv").config();
//package
const express = require("express");
const { PORT } = require("./config");
const connectDB = require("./config/db");
const cors = require("cors");

//file
const authRoutes = require("./routes/authRoutes");
const studentRoute = require("./routes/studentRoute");
const adminRoute = require("./routes/adminRoute");
const documentRoute = require("./routes/documentRoute");
const app = express();


//middlewares
app.use(express.json());
app.use(cors());

connectDB();

app.use("/auth", authRoutes);
app.use("/student", studentRoute);
app.use("/admin", adminRoute);
app.use("/document", documentRoute);

app.listen(PORT, () => {
  console.log(`success`);
});
