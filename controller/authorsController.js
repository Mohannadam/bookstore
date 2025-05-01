
const asyncHandler= require('express-async-handler');
const {Author,validateCreateauthors, validateUpdateauthors} = require('../models/Author');



/**
 * @description Get all author
 * @route       /api/books
 * @method      Get
 * @access      public
 */

const getAllAuthor = asyncHandler(
    async (req, res) => { 
        const {pageNumber} = req.query; 
        const authorsPerPage = 2;
        const authorList = await Author.find().skip((pageNumber - 1)*authorsPerPage).limit();
        res.status(200).json(authorList);
    }
);



/**
 * @description Get author by id
 * @route       /api/books/:id
 * @method      Get
 * @access      private
 */ 

const getAuthorByID = asyncHandler(
    async(req, res) => {
      
        const author = await Author.findById(req.params.id);
          if (author) {
              res.status(200).json(author);
          } else {
              res.status(404).json({ message: 'authors not found' });
          }
          
      }
);


/**
 * @description add authors
 * @route       /api/books
 * @method      Get
 * @access      private(only admin)
 */


const addAuthor = asyncHandler(
    async (req, res) => {

        const {error} = validateCreateauthors (req.body);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
      }
          const author = new Author({
              
              firstName:req.body.firstName,
              lastName:req.body.lastName,
              nationality:req.body.nationality,
              image:req.body.image
          });
          const result = await author.save(); 
          res.status(201).json(result);
         
      }
);



/**
 * @description update a authors
 * @route       /api/books/:id
 * @method      Put
 * @access      private(only admin)
 */

const updateAuthors = asyncHandler(
    async (req,res)=>{

        const {error} =  validateUpdateauthors(res.body);
     
         const author = await Author.findByIdAndUpdate(req.params.id,{
             $set:{firstName:req.body.firstName,
                 lastName:req.body.lastName,
                 nationality:req.body.nationality,
                 image:req.body.image
             },
             
         },{new:true}); 
         res.status(200).json(author);
         if (error) {
             return res.status(400).json({message: error.details[0].message});
         }
     
     }
);


/**
 * @description Delete an authors
 * @access  private(only admin)
 * @method  Delete
 * @rout    /api/books/:id  
 */


const deleteAuthors = asyncHandler(async(req,res)=>{

    const author= await Author.findById(req.params.id);
    if (author){
 
     await Author.findByIdAndDelete(req.params.id);
     res.status(200).json({message:'authors has been deleted'});
    }
    else{
     res.status(404).json({message:'authors not deleted'});
 }
 
   
 });

 module.exports = {
    getAllAuthor,
    getAuthorByID,
    addAuthor,
    updateAuthors,
    deleteAuthors
 }

