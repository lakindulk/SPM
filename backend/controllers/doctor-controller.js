const DoctorModel = require("../models/doctor-model");
const AllUsersModel = require("../models/allusers-model");
const NotificationModel=require("../models/notification-model");
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
      const destroyedImage = await cloudinary.uploader.destroy(
        req.user.profileImage.imagePublicId
      );
      if (destroyedImage) {
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
      } else {
        res.status(500).json({
          success: false,
          desc: "Error in previous image remove-" + error,
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
  const { patientname, suggesions, medicines, othernotes,noteduetoreport } =
    req.body;
    const data = {
      fromId: req.user._id,
      subject: "Suggest Treatment to a patient",
      desc: req.body.patientname,
      
    };
  try {
    
    const treatment = {
      patientname, 
      suggesions, 
      medicines, 
      othernotes,
      noteduetoreport,
    };

    const newtreatment = await DoctorModel.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { treatment: treatment } },
      {
        new: true,
      }
    );
    const result = await sendNotification(data, res);
    if (result) {
    res.status(201).send({ newtreatment,success: true, result });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in doctor controller-" + error,
    });
  }
};


// edit treatment
exports.updatetreatment = async (req, res) => {
  const {  suggesions, medicines, othernotes,noteduetoreport , tID } = req.body;
  try {
    const result = await DoctorModel.findOneAndUpdate(
      { "treatment._id": tID },
      {
        $set: {
          "treatment.$.suggesions": suggesions,
          "treatment.$.medicines": medicines,
          "treatment.$.othernotes": othernotes,
          "treatment.$.noteduetoreport": noteduetoreport,
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).json({ success: true, desc: " Treatmant data updated", result });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updateTreatmant controler-" + error,
    });
  }
};


//remove treatmant data
exports.removetreatmant= async (req, res) => {
  const { tID } = req.body;
  const data = {
    fromId: req.user._id,
    subject: " Treatment deleted",
    desc:"deleted",
    
  };
  try {
    const updatetreatment = await DoctorModel.updateOne(
      { _id: req.user._id },
      { $pull: { treatment: { _id: tID } } },
      {
        new: true,
      }
    );

    const result = await sendNotification(data, res);
    res.status(200).json({
      success: true,
      desc: " treatmant data deleted",
      updatetreatment,result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in removetreatmant controler-" + error,
    });
  }
};


// add report request
exports.addreportrequest = async (req, res) => {
  const { patient, patientsdescription, docnote, reporttype1,reporttype2,othertype } =
    req.body;
    const data = {
      fromId: req.user._id,
      subject: "Report request to a patient",
      desc: req.body.patient,
      
    };
  try {
    
    const Report = {
      patient, 
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
  const {  patientsdescription, docnote, reporttype , rID } = req.body;
  try {
    const result = await DoctorModel.findOneAndUpdate(
      { "Report._id": rID },
      {
        $set: {
          "Report.$.patientsdescription": patientsdescription,
          "Report.$.docnote": docnote,
          "Report.$.reporttype": reporttype,
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

