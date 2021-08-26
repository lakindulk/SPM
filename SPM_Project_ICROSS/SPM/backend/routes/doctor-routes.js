const express = require("express");
const router = express.Router();

//import protected-routes middlewares
const { protectedDoctor} = require("../middlewares/route-authorization");

//import controllers
const {
    getDoctorDetails,
    updateDoctorDetails,
    updateProfilePicture,
    deleteDoctorDetails,
    addtreatment,
    updatetreatment,
    removetreatmant,
    addreportrequest,
    updatereportrequest,
    removereportrequest
} = require("../controllers/doctor-controller");

//Registration-routes
router.route("/getProfile").get(protectedDoctor, getDoctorDetails);
router.route("/editProfile").put(protectedDoctor, updateDoctorDetails);
router.route("/updatepic").put(protectedDoctor, updateProfilePicture);
router.route("/deleteprofile").delete(protectedDoctor, deleteDoctorDetails);
router.route("/addtreatments").put(protectedDoctor, addtreatment);
router.route("/updatetreatment").put(protectedDoctor, updatetreatment);
router.route("/removetreatmant").put(protectedDoctor, removetreatmant);
router.route("/addreportrequest").put(protectedDoctor, addreportrequest);
router.route("/updatereportrequest").put(protectedDoctor, updatereportrequest);
router.route("/removereportrequest").put(protectedDoctor, removereportrequest);




module.exports = router;
