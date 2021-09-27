require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//import routes

const authenticationRoutes = require("./routes/authentication-routes");
const doctorRoutes = require("./routes/doctor-routes");
const notificationRoute=require("./routes/notification-routes");
const adminRoutes=require("./routes/admin-routes");

const pharmacistRoutes = require("./routes/pharmacist_routes");

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
app.use("/codebusters/api/doctorpvt", doctorRoutes);
app.use("/codebusters/api/pharmacistpvt/notification", notificationRoute);
app.use("/codebusters/api/admin",adminRoutes);



app.use("/codebusters/api/pharmacistpvt", pharmacistRoutes);


//Stock item rotes
const itemRoutes = require("./routes/item_routes");
app.use("/item",itemRoutes)

//Pharmacist Order routes
const DeliveryRoutes = require("./routes/recieved-order-routes");
app.use("/order",DeliveryRoutes)

//Feedback routes
const FeedbackRoutes = require("./routes/feedback_routes")
app.use("/feedback",FeedbackRoutes)
//event loop for server
app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});
