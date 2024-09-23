const mongoose = require('mongoose');
const joi = require('joi');


// Book Schema

const BookSchema = new mongoose.Schema({

    title:{
        type:String,
        required: true,
        minlength: 3,
        maxlength: 250,
        trim: true

    },author:{


        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Author',

    },description:{
        type:String,
        required: true,
        trim: true,
        minlength: 5,
       


    },price:{
        type:Number,
        required: true,
        min: 0
    },cover:{
        type:String,
        required: true,
       enum:['soft cover', 'hard cover']

    }
},
{timestamps:true});




const Book = mongoose.model('Book',BookSchema);

function validateCreateBook (obj){

    const schema = joi.object({ 
        title: joi.string().trim().min(3).max(250).required(),
        author: joi.string().required(),
        description: joi.string().trim().min(5).required(),
        price: joi.number().min(0).required(),
        cover: joi.string().valid('soft cover', 'hard cover').required(),
    });
    
    // التحقق من صحة البيانات الواردة
    return schema.validate(obj); 
  
}

function validateUpdateBook (obj){

    const schema = joi.object({ 
        title: joi.string().trim().min(3).max(33),
        author: joi.string(),
        description: joi.string().trim().min(5),
        price: joi.number().min(0),
        cover: joi.string().valid('soft cover', 'hard cover')
    });

    return schema.validate(obj); 


};

module.exports= {
    Book,
    validateCreateBook,
    validateUpdateBook,
}