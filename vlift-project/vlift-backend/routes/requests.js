const express = require('express');
const router = express.Router();
const {Request, validate} = require('../models/request');


router.get('/', async(req,res)=> {
   const requests =  await Request.find().sort('-1');
    res.send(requests);
});

// router.get('/:name', async(req,res)=> {
//    const request =  await Request.findOne({name: req.params.name});
//    if(!request) return res.status(404).send("Request with the specified name not found");

//    res.send(request);

// });

router.post('/', async(req,res)=> {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let request = new Request({
        name: req.body.name,
        email: req.body.email,
        serviceName: req.body.serviceName,
        serviceDescription: req.body.serviceDescription,
        budget: req.body.budget,
        date: req.body.date
    });
    await request.save()
    res.send(request);
});


router.delete('/:id', async(req,res)=> {
   const request = await Request.findByIdAndDelete({_id: req.params.id});
   if(!request) return res.status(404).send("Request with the specified Id is not found!");

    res.send(request);
    
});

module.exports = router;