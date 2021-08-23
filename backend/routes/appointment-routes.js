
const express = require("express");
const router = express.Router();

// import controllers
const {
    addappointment,
    getapointment,
    updateapointment
} = require("../controllers/PatientController");

// use routes
router.route("/addappointments").put(addappointment);
router.route("/getapointments").get(getapointment);
router.route("/updateapointments").put(updateapointment);




module.exports = router;
