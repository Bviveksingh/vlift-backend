const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');


const adminSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

adminSchema.methods.generateAuthToken = function(){
    const token =  jwt.sign({ _id : this._id }, config.get('jwtPrivateKey'));
    return token;
}


const Admin = mongoose.model('Admin', adminSchema);


function validateAdmin(user){
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }
    return Joi.validate(user, schema);
}


exports.Admin = Admin;
exports.validate = validateAdmin;