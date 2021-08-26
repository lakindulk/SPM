const PatientModel = require("../models/patient-model");
const AllUsersModel = require("../models/allusers-model");
const Apointment = require("../models/appointment-model");

exports.updatePatientDetails = async (req, response) => {
  const body = req.body;
  console.log(body)

  try {
    await AllUsersModel.findOneAndUpdate(
      { email: body.email },
      { email: body.email },
      { omitUndefined: true }
    );

    await PatientModel.findByIdAndUpdate({ _id: body.userId }, {
      gender: body.gender,
      bloodGroup: body.bloodGroup,
      address: body.address,
      zipcode: body.zipcode,
      nicNumber: body.nicNumber,
      fullname: body.fullname,
      phone: body.phone
    })

    response.send({ success: true, message: "Successfully Updated" })
  } catch (e) {
    response.send({ success: false, message: "Didn't Update" })
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

//delete patient profile
// exports.deletePatientDetails = async (req, res) => {
//   try {
//     await PatientModel.findByIdAndDelete(req.user._id);
//     await AllUsersModel.findOneAndRemove({ email: req.user.email });


//     res.status(200).send({
//       status: true,
//       desc: "deleted from the db",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       desc: "Error in delete Doctorr Details controller-" + error,
//     });
//   }
// };

exports.deletePatientDetails = async (req, res) => {

  //console.log(backend)

  let patientID = req.params.id;
  const deletedApointment = await Apointment.findByIdAndDelete(
    patientID).exec((err) => {
      if (err) {
        return res.status(400).json({
          message: "Appointment Deleted Unsuccessfully", err
        });
      }
      return res.json({
        message: "Appointment Deleted Successfully", deletedApointment
      });
    });

}

// add appointment
exports.addappointment = async (req, res) => {
  const id = req.params.id
  const body = req.body;

  try {
    const patient = await PatientModel.findOne({ _id: id }).exec();

    console.log(patient);

    const appointmentDate = body.appointmentDate
    const appointmentTime = body.appointmentTime
    const physician = body.physician
    const gender = patient.gender
    const userID = id
    const fullname = patient.fullname
    const appointmentNote = body.appointmentNote

    const apointment = new Apointment({
      appointmentDate,
      appointmentTime,
      physician,
      gender,
      userID,
      fullname,
      appointmentNote
    });

    console.log(apointment)

    await apointment.save();

    res.send({ success: true, apointment });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in addappointment controller in patient-" + error,
    });
  }
};

//fetch all apointment
exports.getapointment = async (req, res) => {
  const userID = req.params.id
  try {
    const apointment = await Apointment.find({ userID: userID }).exec();
    // const apointment = await Apointment.find();
    res.status(200).send({
      success: true,
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
  let { appointmentDate, appointmentTime, physician, gender, userId, fullname, appointmentNote } = req.body;
  try {
    const updatedapointment = await Apointment.findByIdAndUpdate(
      userId,
      {
        $set: {
          appointmentDate,
          appointmentTime,
          physician,
          gender,
          fullname,
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

exports.deleteapointment = async (req, res) => {

  //console.log(backend)

  let appointmentID = req.params.id;
  const deletedApointment = await Apointment.findByIdAndDelete(
    appointmentID).exec((err) => {
      if (err) {
        return res.status(400).json({
          message: "Appointment Deleted Unsuccessfully", err
        });
      }
      return res.json({
        message: "Appointment Deleted Successfully", deletedApointment
      });
    });

}




