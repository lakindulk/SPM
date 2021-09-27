const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stockItem = new Schema({
   
    MediName :{
        type : String
      
       
    },
    Amount:{
        type : Number
        
    },
    Cost:{
        type : Number
        
    },
    CompanyName:{
        type : String
       
       
    },
    ManuDate:{
        type : Date
       
       
    },
    ExpireDate:{
        type : Date
       
       
    }
})

const Items = mongoose.model("Stock_Item",stockItem);
module.exports=Items
