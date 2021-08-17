const express = require("express");
const router = express.Router();

// import controllers
const {
    getAdminDetails,
    getAlluserDetails,
} = require("../controllers/admin-controller");

// use routes
router.route("/getprofile").get(getAdminDetails);
router.route("/allusers").get(getAlluserDetails);



module.exports = router;
