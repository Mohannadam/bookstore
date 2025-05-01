const asyncHandler= require('express-async-handler');
const bcrypt = require('bcrypt');
const{User,validationRegisterUser,validationLoginUser} = require('../models/User');




/** hello
 * @description Register New User
 * @route       /api/auth/register
 * @method      post
 * @access      public
 */ 


const register = asyncHandler(async(req, res) => {

    const {error} = validationRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message }); 
    }
    let user = await User.findOne({email: req.body.email});

    if(user){
        return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password,salt); 

    user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        
 
         
    });
    const result = await user.save();


    const token = user.generateToken();

    const {password,...other} = result._doc;

    res.status(201).json({ ...other,token }); 

});



/**
 * @description Login User
 * @route       /api/auth/register
 * @method      post
 * @access      public
 */ 

const login = asyncHandler(async(req, res) => {

    const {error} = validationLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message }); 
    }

    let user = await User.findOne({email: req.body.email});

    if(!user){
        return res.status(400).json({ message: 'invalid email ' });
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password,user.password );
 
    if(!isPasswordMatch){
        return res.status(400).json({message:"password invalid"}); 
    }
 

    const token = user.generateToken(); 
    const {password,...other} = user._doc;


    res.status(200).json({ ...other ,token});
  
});


module.exports = {register,login};