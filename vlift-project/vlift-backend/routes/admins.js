const auth = require('../middleware/auth');

const _ = require('lodash');
const bcrypt = require('bcryptjs');
const express = require('express');

const router = express.Router();
const {Admin, validate} = require('../models/admin');


router.get('/', async(req,res)=> {
    const admins = await Admin.find().sort('name');
    res.send(admins);
}); 


router.post('/', async(req,res) => {
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let admin = await Admin.findOne({email: req.body.email});
    if(admin) return res.status(400).send("User is already registered with the given email");


    admin = new Admin(_.pick(req.body, ['name',  'password', 'email']));
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
    
        await admin.save();
        res.send(_.pick(admin, ['_id', 'name', 'email', 'password']));    
});


router.put('/:id', async(req,res) => {
    let admin = await Admin.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password

    }, {new: true});
    
    if(!admin) return res.status(404).send("User with the given id was not found");    

    res.send(admin);
});

router.delete('/:id', async(req,res) => {
    let admin = await Admin.findByIdAndDelete(req.params.id);
    if(!admin) return res.status(404).send("User with the given id was not found");    

    res.send(admin);
});


router.get('/:id',async(req,res) => {
    let admin = await Admin.findById(req.params.id);
    if(!admin) return res.status(404).send("User with the given id was not found");    

    res.send(admin);
});



module.exports = router;