const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken'); 



const UserSchema = new mongoose.Schema({

    email:{
        type: 'string',
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 100, 
        trim: true,
    },
    username:{
        type: 'string',
        required: true,
        minlength: 2,
        maxlength: 200, 
        trim: true,
    },
    password:{
        type: 'string',
        required: true,
        minlength: 6,
        trim: true, 
    },
    isAdmin:{
        type: Boolean,
        default: false, 
    },
   
},{timestamps:true});



//Genarate Token
UserSchema.methods.generateToken = function(){
   return jwt.sign({ id: this._id,isAdmin: this.isAdmin },process.env.JWT_SECRET_KEY);
} 




//User model 
const User = mongoose.model("User",UserSchema);



// validation register user

const validationRegisterUser = function(obj) {

    const schema = joi.object({ 
        email: joi.string().trim().min(5).max(100).required().email(),
        username: joi.string().trim().min(2).max(200).required(),
        password: joi.string().trim().min(5).max(100).required(),
        
    });
    return schema.validate(obj);
}

// validation Login user

const validationLoginUser = function(obj) {
    const schema = joi.object({ 
        email: joi.string().trim().min(5).max(100).required().email(),
        password: joi.string().trim().min(6).required(),
    });

    return schema.validate(obj); // تأكد من إعادة النتيجة
}


// validation update user

const validationUpdateUser = function(obj){

    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).email(),
        username: joi.string().trim().min(2).max(200),
        password: joi.string().trim().min(5),
        
    });
    return schema.validate(obj);
}



// export

module.exports = {
     User,
    validationRegisterUser,
    validationLoginUser,
    validationUpdateUser,

}