const PatientModel = require("../models/patient-model");
const AllUsersModel = require("../models/allusers-model");
const Apointment =require("../models/appointment-model");

//fetch doctor details
exports.addAppoinment = async (req,res) => {
    const body = req.body;
    console.log(body)

    try{
        await PatientModel.findByIdAndUpdate({_id:req.params.id},{
            appoinment:body
        })

        res.send({success:true,message:"Successfully Appoinment Inserted"})
    }catch(e){
        res.send({success:false,message:"Didn't Update"})
    }
}

exports.updatePatientDetails = async (req, response) => {
    const body = req.body;
    console.log(body)

    try{
        await AllUsersModel.findOneAndUpdate(
            { email: body.email },
            { email: body.email },
            { omitUndefined: true }
        );

        await PatientModel.findByIdAndUpdate({_id:body.userId},{
            gender:body.gender,
            bloodGroup:body.bloodGroup,
            address:body.address,
            zipcode:body.zipcode,
            nicNumber:body.nicNumber,
            fullname:body.fullname,
            phone:body.phone
        })

        response.send({success:true,message:"Successfully Updated"})
    }catch(e){
        response.send({success:false,message:"Didn't Update"})
    }
}

exports.getPatientDetails = async (req, res) => {
    const id = req.params.id;

    try {
        const profileDetails = await PatientModel.findOne({ _id: id }).exec();
        res.send({ data: profileDetails, success: true })
    } catch (e) {
        console.log(e)
    }
}

// add appointment
exports.addappointment = async (req, res) => {
    const { appointmentDate, appointmentTime, physician, patientName,appointmentNote} =
      req.body;
    
      try {    
        const apointment = await Apointment.create({
            appointmentDate,
             appointmentTime, 
             physician, 
             gender,
             patientName,
             appointmentNote
        });
        res.status(201).json({ success: true, apointment });
      } catch (error) {
        res.status(500).json({
          success: false,
          desc: "Error in addappointment controller in patient-" + error,
        });
      }  
  };
  
  //fetch all apointment
  exports.getapointment = async (req, res) => {
    try {
      const apointment = await Apointment.find();
      res.status(200).send({
        apointment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in getapointment controller-" + error,
      });
    }
  };
  
  // edit apointment
  exports.updateapointment = async (req, res) => {
    let { aID, appointmentDate, appointmentTime, physician, patientName,appointmentNote } = req.body;
    try {
      const updatedapointment = await Apointment.findByIdAndUpdate(
        aID,
        {
          $set: {
            appointmentDate,
             appointmentTime,
              physician,
              gender,
               patientName,
               appointmentNote
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
        desc: "apointment data updated successfully",
        updatedapointment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in updatedapointment controller-" + error,
      });
    }
  };
  
  
  //remove apointment data
  
  
