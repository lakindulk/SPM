const mongoose = require('mongoose');

const MedicineOrderSchema = new mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    email:{
        type:String
    },
    gender:{
        type:String
    },
    address:{
        type:String
    },
    allergies:{
        type:String
    },
    currentlyTakingMedications:{
        type:String
    },
    existingMedicalProblems:{
        type:String
    },
    userID:{
        type:String,
      },
    signature:{
        type:String
    },
    photo: {
        type:String
    },
    status:{
        type:String,
        default:"Pending"
       
    },
    telNo:
    {
        type:Number,
    }
    

});

const MedicineOrder = mongoose.model(
    "ordermedicine",
    MedicineOrderSchema
);

module.exports = MedicineOrder;
