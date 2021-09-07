const ContactusModel = require('../models/contactus-model');


// add notice
exports.createContact = async (req, res) => {
    const { fullname,email,message} =
      req.body;
    
      try {    
        const contact = await ContactusModel.create({
            fullname,
            email,
            message
        });
        res.status(201).json({ success: true, contact });
      } catch (error) {
        res.status(500).json({
          success: false,
          desc: "Error in contactus controller" + error,
        });
      }  
  };

  //get all notices
  exports.getallcontacts = async (req,res) => {
    await ContactusModel.find({})
    .then(data => {
       res.status(200).send({ data: data});
    })
    .catch(error => {
      res.status(500).send({error: error.message});
    })
  }