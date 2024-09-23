const express = require('express');
const router = express.Router();
const asyncHandler= require('express-async-handler');
const bcrypt = require('bcrypt'); 
const{User,validationUpdateUser} = require('../models/User');  
const {verifytokenAndAdmin,verifytokenAndAuthorization} = require('../middlewares/verifytoken');

/**
 * @description Update User
 * @route       /api/users/:id
 * @method      put
 * @access      private
 */  

 
router.put("/:id",verifytokenAndAuthorization,asyncHandler(async(req,res  )=>{




    const {error} =  validationUpdateUser(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    } 
  


    if(req.body.password){

        const salt= await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt);
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id,{

        $set:{
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
         
        }


    },{new:true}).select("-password");
    res.status(200).json(updateUser);



}));

 
/**
 * @description Get all Users
 * @route       /api/users
 * @method      get
 * @access      private (only admin)
 */   

 
router.get("/",verifytokenAndAdmin,asyncHandler(async(req,res  )=>{

    const users = await User.find().select("-password");

    res.status(200).json(users);



})); 

/**
 * @description Get User By ID
 * @route       /api/users/:id
 * @method      get
 * @access      private (only admin and self users)
 */   

 
router.get("/:id",verifytokenAndAuthorization,asyncHandler(async (req,res)=>{

    const user = await User.findById(req.params.id).select("-password");
 
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({message:'user not found'});
    }
    



})); 

/**
 * @description delete User
 * @route       /api/users/:id
 * @method      Delete
 * @access      private (only admin)
 */   

 
router.delete("/:id",verifytokenAndAuthorization ,asyncHandler(async(req,res)=>{

    const user  = await User.findById(req.params.id).select("-password");
    console.log(req.params.id);

    if(user){
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'user has been deleted'});
    }else{
        res.status(404).json({message:'user not found'});
    }
   


}));  



module.exports=router;