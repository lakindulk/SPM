const mongoose = require("mongoose");

const ApointmentSchema = new mongoose.Schema({

appointmentDate:{
    type:String,
  },
  appointmentTime:{
    type:String,
  },
  physician:{
    type:String,
  },
  gender:{
    type:String,
  },
  patientName:{
    type:String,
  },
  appointmentNote:{
    type:String,
  }
  
});

const Apointment = mongoose.model("appointment", ApointmentSchema);
module.exports = Apointment;



