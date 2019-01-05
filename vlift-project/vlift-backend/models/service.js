const mongoose = require('mongoose');
const Joi = require('joi');


const serviceSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    }
});



const Service = mongoose.model('Service', serviceSchema);


function validateService(service){
    const schema = {
        name: Joi.string().required(),
        description: Joi.string().required()
    }

    return Joi.validate(service, schema);
}

exports.Service = Service;
exports.validate = validateService;