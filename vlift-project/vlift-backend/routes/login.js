const _ = require('lodash');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {Admin} = require('../models/admin');



router.post('/', async(req,res) => {
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let admin = await Admin.findOne({email: req.body.email});
    if(!admin) return res.status(404).send("Invalid email or password");
    
    const validPassword = await bcrypt.compare(req.body.password, admin.password);
    if(!validPassword) return res.status(404).send("Invalid email or password")


    const token = admin.generateAuthToken();
    // let body = { 
    //     jwtToken : token
    // }
    // const decodedToken = jwt_decode(token);
    
    
    
    res.send({jwtToken: token});            
});


// router.put('/:id', async(req,res) => {
//     let user = await User.findByIdAndUpdate(req.params.id, {
//         name: req.body.name,
//         userName: req.body.userName,
//         email: req.body.email,
//         mobileNumber: req.body.mobileNumber,
//         isAdmin: req.body.isAdmin
//     }, {new: true});
    
//     if(!user) return res.status(404).send("User with the given id was not found");    

//     res.send(user);
// });

// router.delete('/:id', async(req,res) => {
//     let user = await User.findByIdAndDelete(req.params.id);
//     if(!user) return res.status(404).send("User with the given id was not found");    

//     res.send(user);
// });


// router.get('/:id', async(req,res) => {
//     let user = await User.findById(req.params.id);
//     if(!user) return res.status(404).send("User with the given id was not found");    

//     res.send(user);
// });

function validate(req){
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(7).required()
    }
    return Joi.validate(req, schema);
}



module.exports = router;