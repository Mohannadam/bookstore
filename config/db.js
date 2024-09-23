const mongoose = require('mongoose');


async function connectTodb (){

    try{

       await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');

    }catch(error){

       console.log('Error connecting', error);

    }}

module.exports = connectTodb;

 // mongoose.connect(process.env.MONGO_URI)
// .then(()=>{
//     console.log('Connected to MongoDB');
// }).catch((error)=>console.log('Error connecting'));