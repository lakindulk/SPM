const express = require('express');
const router = express.Router();
const { protectedPatient} = require("../../middlewares/route-authorization");

const {
    updatePatientDetails,
    getPatientDetails,
    deletePatientDetails
    
} = require("../../controllers/PatientController");

router.route('/getPatientDetails/:id').get(protectedPatient, getPatientDetails);
router.route('/updatePatientDetails').put(updatePatientDetails,protectedPatient);
router.route('/deletePatientProfile/:id').delete(deletePatientDetails,protectedPatient);


module.exports=router;




