const mongoose = require('mongoose');

const MedicineOrderSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    age:{
        type:Number,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    gender:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    allergies:{
        type:String,
        required: true,
    },
    currentlyTakingMedications:{
        type:String,
        required: true,
    },
    existingMedicalProblems:{
        type:String,
        required: true,
    },
    userID:{
        type:String,
      },
    signature:{
        type:String,
        required: true,
    }
});

const MedicineOrder = mongoose.model(
    "ordermedicine",
    MedicineOrderSchema
);

module.exports = MedicineOrder;
