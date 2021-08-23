
const express = require("express");
const router = express.Router();

// import controllers
const {
    addtreatment,
    getTreatment,
    updatetreatment
} = require("../controllers/doctor-controller");

// use routes
router.route("/addtreatments").put(addtreatment);
router.route("/gettreatments").get(getTreatment);
router.route("/updatetreatments").put(updatetreatment);




module.exports = router;
