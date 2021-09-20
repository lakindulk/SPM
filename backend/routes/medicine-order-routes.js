const express = require("express");
const router = express.Router();
const MedicineOrder = require('../models/medicine-order-model');

// add new medicine order
router.post('/order/save', (req, res) => {
    let newOrder = new MedicineOrder({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        gender: req.body.gender,
        address: req.body.address,
        allergies: req.body.allergies,
        currentlyTakingMedications: req.body.currentlyTakingMedications,
        existingMedicalProblems: req.body.existingMedicalProblems,
        signature: req.body.signature
    });

    newOrder.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Order Successfully Saved"
        });
    });
});

// get medicine order
router.get("/orders", (req, res) => {
    MedicineOrder.find().exec((err, orders) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingOrders: orders
        });
    });
});

// find medicine order by id
router.get('/orders/:id', (req, res) => {
    MedicineOrder.findById(req.params.id)
        .then(order => res.json(order))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

//update medicine order
// router.put('/order/update/:id',(req,res)=>{
//     MedicineOrder.findByIdAndUpdate(
//         req.params.id,
//         {
//             $set:req.body
//         },
//         (err,order)=>{
//             if(err){
//                 return res.status(400).json({error:err});
//             }

//             return res.status(200).json({
//                 success:"Order Successfully Updated !"
//             });
//         }
//     );
// });


//update medicine order by id
router.put('/order/update/:id', (req, res) => {
    MedicineOrder.findById(req.params.id)
        .then(order => {
            order.name = req.body.name;
            order.age = req.body.age;
            order.email = req.body.email;
            order.gender = req.body.gender;
            order.address = req.body.address;
            order.allergies = req.body.allergies;
            order.currentlyTakingMedications = req.body.currentlyTakingMedications;
            order.existingMedicalProblems = req.body.existingMedicalProblems;
            order.signature = req.body.signature;

            order.save()
                .then(() => res.json({ success: "Order Successfully Updated !" }))
                .catch(err => res.status(400).json(`Error:${err}`))
        })
        .catch(err => res.status(400).json(`Error:${err}`))
});

// delete medicine order by id
router.delete('/order/delete/:id', (req, res) => {
    MedicineOrder.findByIdAndRemove(req.params.id).exec((err, deletedOrder) => {
        if (err) {
            return res.status(400).json({
                message: "Deleted Not Successful", err
            });
        }
        return res.json({
            message: "Order Deleted Successfully !",
            deletedOrder
        });
    });
});

module.exports = router;