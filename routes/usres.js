const express = require('express');
const router = express.Router();
const {verifytokenAndAdmin,verifytokenAndAuthorization} = require('../middlewares/verifytoken');
const {  updateUser, getAllUsers,getUserByID,deleteUser} = require('../controller/usersControler');






router.get("/",verifytokenAndAdmin,getAllUsers); 



router.route("/:id").put(verifytokenAndAuthorization,updateUser)
.get(verifytokenAndAuthorization,getUserByID)
.delete(verifytokenAndAuthorization ,deleteUser);  

module.exports=router;