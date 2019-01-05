const express = require('express');
const router = express.Router();
const {Service, validate} = require('../models/service');


router.get('/', async(req,res)=> {
   const services =  await Service.find().sort('-1');
    res.send(services);
});

router.get('/:name', async(req,res)=> {
   const service =  await Service.findOne({name: req.params.name});
   if(!service) return res.status(404).send("Service with the specified name not found");

   res.send(service);

})

router.post('/', async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let service = new Service({
        name: req.body.name,
        description: req.body.description
    });
    await service.save()
    res.send(service);
});

module.exports = router;