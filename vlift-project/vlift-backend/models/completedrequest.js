const mongoose = require('mongoose');
const Joi = require('joi');



const completedrequestSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email:{
        type: String
    },
    serviceName:{
        type: String
    },
    serviceDescription:{
        type: String
    },
    budget: {
        type: Number
    },
    date: {
        type: String
    },
    
});


function validateRequest(request){
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required(),
        serviceName: Joi.string().required(),
        serviceDescription: Joi.string().required(),
        budget: Joi.number(),
        date: Joi.string().required()
    }
    return Joi.validate(request, schema);
}


const Request = mongoose.model('CompletedRequest', completedrequestSchema);


exports.Request = Request;
exports.validate = validateRequest;