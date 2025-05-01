const {Book} = require("./models/Book");
const {Author } = require("./models/Author");
const {books,authors } = require("./data");
const connectTodb = require("./config/db"); 
require("dotenv").config();

//connecting to DB
connectTodb();

// Import books
    const importBook = async () => {
        try{

            await Book.insertMany(books);
            console.log("Books imported successfully");

        }catch(error){

            console.log(error);
            process.exit(1);
        }
    };



    // Import Authors
    const importAuthors = async () => {
        try{

            await Author.insertMany(authors);
            console.log("Authors imported successfully");

        }catch(error){

            console.log(error);
            process.exit(1);
        }
    };
 


    //remove books
    const removeBook = async () => {
        try{

            await Book.deleteMany();
            console.log("Books removed successfully");

        }catch(error){

            console.log(error);
            process.exit(1);
        }
    };


  

    if(process.argv[2]==="-import"){
        importBook();
    }else if(process.argv[2] ==="-remove"){
        removeBook();
    }else if(process.argv[2] ==="-import-authors"){
        importAuthors(); 
    }