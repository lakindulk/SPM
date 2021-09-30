require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//import routes

const authenticationRoutes = require("./routes/authentication-routes");
const labchemistRoutes = require("./routes/labchemist-routes");
const noticeRoutes = require("./routes/notices-routes");
const adminRoutes=require("./routes/admin-routes");
const contactusRoutes = require("./routes/contactus-routes");
const labreportRoutes = require("./routes/labreport-routes");
const reportrequest=require("./routes/reportrequest-routes");
const chemistSalary = require("./routes/chemsalary-routes");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connection Success");
  })
  .catch((err) => {
    console.log("Connection Failed - " + err);
  });

//use routes
app.use("/codebusters/api/auth", authenticationRoutes);
app.use("/codebusters/api/labchemistpvt",labchemistRoutes);
app.use("/notice", noticeRoutes());
app.use("/codebusters/api/admin",adminRoutes);
app.use("/contactus",contactusRoutes());
app.use("/labreport",labreportRoutes());
app.use("/codebusters/api/doctorpvt/reportrequest", reportrequest);
app.use("/chemist/salary",chemistSalary);


//event loop for server
app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});
