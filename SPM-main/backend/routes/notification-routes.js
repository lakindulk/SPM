const express = require("express");
const router = express.Router();

// import controllers
const {
  updateNotification,
  deleteNotification,
  getnotification
} = require("../controllers/notification-controller");

// use routes
router.route("/editNotification").put(updateNotification);
router.route("/deleteNotification").delete(deleteNotification);
router.route("/getnotification").get(getnotification);



module.exports = router;
