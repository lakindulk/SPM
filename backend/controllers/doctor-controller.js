const DoctorModel = require("../models/doctor-model");
const AllUsersModel = require("../models/allusers-model");
const NotificationModel=require("../models/notification-model");
const PatientModel=require("../models/patient-model");
const TreatmentModel=require("../models/treatment-model");
const { cloudinary } = require("../utils/cloudinary");

//CRUD operations of doctor 

//fetch doctor details
exports.getDoctorDetails = async (req, res) => {
    try {
      if (!req.user) {
        res.status(422).json({
          success: false,
          desc: "Can not find the user - Please check again",
        });
      } else {
        res.status(200).send({
            doctor: req.user,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in get doctor Data controller-" + error,
      });
    }
  };

  //update doctor
exports.updateDoctorDetails = async (req, res) => {
    const { username, email,university,other,experience,phone,
      fullname } = req.body; 
    if (email) {   
      try {
        await AllUsersModel.findOneAndUpdate(
          { email: req.user.email },
          { email: email },
          { omitUndefined: true }
        );
      } catch (error) {
        res.status(500).json({
          success: false,
          desc:
            "Error in updatedoctor-update AllUsers controller-" + error,
        });
      }
    }  
    try {   
      const updatedoctor = await DoctorModel.findByIdAndUpdate(
        req.user.id,
        {
          username,
          email,
          university,
          phone,
          other,
          experience,
          fullname, 
         
        },
        {
          new: true,
          upsert: false,
          omitUndefined: true,
        }
      );
      res.status(200).send({
        success: true,
        desc: " updated successfully",
        updatedoctor,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in update doctor controller-" + error,
      });
    }
  };
  
  //Update doctor profile photo
exports.updateProfilePicture = async (req, res) => {
    const { fileEnc } = req.body;
  
    try {
     
      
        try {
          const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
            upload_preset: "doctor-profile-pictures",
          });
  
          try {
            const updatedDoctor = await DoctorModel.findByIdAndUpdate(
              { _id: req.user._id },
              {
                profileImage: {
                  imagePublicId: uploadedResponse.public_id,
                  imageSecURL: uploadedResponse.secure_url,
                },
              },
              {
                new: true,
                upsert: false,
              }
            );
            res.status(200).send({
              success: true,
              desc: " updated successfully",
              updatedDoctor,
            });
          } catch (error) {
            res.status(500).json({
              success: false,
              desc: "Error in updating doctor profileImage data-" + error,
            });
          }
        } catch (error) {
          res.status(500).json({
            success: false,
            desc: "Error in uploading new image-" + error,
          });
        }
    
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in updateProfile Picture controller-" + error,
      });
    }
  };
  
  //delete doctor profile
exports.deleteDoctorDetails = async (req, res) => {
    try {
      await DoctorModel.findByIdAndDelete(req.user._id);
      await AllUsersModel.findOneAndRemove({ email: req.user.email });
      
  
      res.status(200).send({
        status: true,
        desc: "deleted from the db",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in delete Doctorr Details controller-" + error,
      });
    }
  };

// add treatment
exports.addtreatment = async (req, res) => {
  const { patientname, suggesions, medicines, othernotes,noteduetoreport,docname} =
    req.body;
  
    try {    
      const doctor = await TreatmentModel.create({
        patientname, 
        suggesions, 
        medicines, 
        othernotes,
        noteduetoreport,
        docname
      });
      res.status(201).json({ success: true, doctor });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in doctor  controller-" + error,
      });
    }  
};

//fetch Treatment
exports.getTreatment = async (req, res) => {
  try {
    const Treatment = await TreatmentModel.find();
    res.status(200).send({
      Treatment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getAlluserDetails controller-" + error,
    });
  }
};

// edit treatment
exports.updatetreatment = async (req, res) => {
  let { tID, suggesions, medicines, othernotes, noteduetoreport } = req.body;
  try {
    const updatedtreatment = await TreatmentModel.findByIdAndUpdate(
      tID,
      {
        $set: {
          suggesions, 
          medicines, 
          othernotes, 
          noteduetoreport
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).send({
      success: true,
      desc: "Treatment data updated successfully",
      updatedtreatment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updatetreatment controller-" + error,
    });
  }
};


//remove treatmant data


// add report request
exports.addreportrequest = async (req, res) => {
  const { patientname, patientsdescription, docnote, reporttype1,reporttype2,othertype } =
    req.body;
    const data = {
      fromId: req.user._id,
      subject: "Report request to a patient",
      desc: req.body.patient,
      
    };
  try {
    
    const Report = {
      patientname, 
      patientsdescription, 
      docnote, 
      reporttype1,
      reporttype2,
      othertype
    };

    const newReport= await DoctorModel.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { Report: Report } },
      {
        new: true,
      }
    );
    const result = await sendNotification(data, res);
    if (result) {
    res.status(201).send({ newReport,success: true, result });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in doctor addreportrequest controller-" + error,
    });
  }
};

// edit report request
exports.updatereportrequest = async (req, res) => {
  const {  patientsdescription, docnote, reporttype1 ,reporttype2,othertype, rID } = req.body;
  try {
    const result = await DoctorModel.findOneAndUpdate(
      { "Report._id": rID },
      {
        $set: {
          "Report.$.patientsdescription": patientsdescription,
          "Report.$.docnote": docnote,
          "Report.$.reporttype1": reporttype1,
          "Report.$.reporttype2": reporttype2,
          "Report.$.othertype": othertype,
          
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).json({ success: true, desc: " Report request data updated", result });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updatereportrequest controler-" + error,
    });
  }
};


//remove treatmant data
exports.removereportrequest= async (req, res) => {
  const { rID } = req.body;
  try {
    const updatetreatment = await DoctorModel.updateOne(
      { _id: req.user._id },
      { $pull: { Report: { _id: rID } } },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      desc: " Report data deleted",
      updatetreatment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in removereportrequest controler-" + error,
    });
  }
};




const sendNotification = async (data, res) => {
  try {
    const newNotification = await NotificationModel.create({
      from: {
        userRole: "doctor",
        userid: data.fromId,
      },
      to: {
        userRole: "admin",
      },
      subject: data.subject,
      patientname: data.desc,
    });
    return newNotification;
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in sendNotification in doctor controller - " + error,
    });
  }
};

