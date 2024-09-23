
const mongoose = require('mongoose');
const joi = require('joi');

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200,
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200,
    },
    image: {
        type: String,
        default: "default-avatar.png"
    },
}, {
    timestamps: true,
});

function validateCreateauthors (obj){

    const schema = joi.object({ 
        firstName:joi.string().trim().min(2).max(200).required(),
        lastName:joi.string().trim().min(2).max(200).required(),
        nationality:joi.string().trim().min(2).max(200).required(),
        image:joi.string(),
       
    });
    
    
    return schema.validate(obj); 
  
}


function validateUpdateauthors (obj){

    const schema = joi.object({ 
        
        firstName:joi.string().trim().min(2).max(200).required(),
        lastName:joi.string().trim().min(2).max(200).required(),
        nationality:joi.string().trim().min(2).max(200).required(),
        image:joi.string(),
  
    });

    return schema.validate(obj); 


};
const Author = mongoose.model('Author',AuthorSchema);
module.exports ={
    Author,validateCreateauthors,
    validateUpdateauthors
}
