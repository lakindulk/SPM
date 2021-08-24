const Adminmodal = require("../models/admin-model");
const Allusers =require("../models/allusers-model");

//Fetch admin details
  exports.getAdminDetails = async (req, res) => {
    try {
      const admindetails = await Adminmodal.find();
      res.status(200).send({
        admindetails
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in getAdminDetails controller-" + error,
      });
    }
  };

//Fetch all User details
exports.getAlluserDetails = async (req, res) => {
    try {
      const allusers = await Allusers.find();
      res.status(200).send({
        allusers
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in getAlluserDetails controller-" + error,
      });
    }
  };