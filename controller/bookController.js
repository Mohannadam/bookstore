
const asyncHandler= require('express-async-handler');
const {validateUpdateBook,validateCreateBook,Book}= require('../models/Book');




/**
 * @description Get all books
 * @route       /api/books
 * @method      Get
 * @access      public
 */

const getAllBooks = asyncHandler( async (req, res) => { 

    const {minPrice, maxPrice} = req.query;
    let books;
    if(minPrice && maxPrice){

        books = await Book.find({price:{$gte:minPrice,$lte:maxPrice}}).
        populate('author',["_id",'firstName',"lastName"]);
         res.status(200).json(books);
    }else{
        books = await Book.find().populate('author',["_id",'firstName',"lastName"]);
        res.status(200).json(books);
    }
})  


/**
 * @description Get book by id
 * @route       /api/books/:id
 * @method      Get
 * @access      public
 */


const getBookById = asyncHandler( async (req, res) => {
    const book = await Book.findById(req.params.id).populate('author');
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});


/**
 * @description add book 
 * @route       /api/books
 * @method      post
 * @access      private (only admin)
 */
  
const creatBook =asyncHandler(async (req, res) => {

    const {error} = validateCreateBook (req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
  }
      // إضافة الكتاب الجديد إلى المصفوفة
      const book =new Book (
        {
        
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          price: req.body.price,
          cover: req.body.cover
        }
);
      
     const result =  await book.save();
      res.status(201).json(result);
  })



/**
 * @description update a book
 * @route       /api/books/:id
 * @method      Put
 * @access      peivate(only admin)
 */



 const updateBook = asyncHandler(
   async (req,res)=>{

        const {error} = validateUpdateBook(req.body);
    
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }
    
        const updatedbook = await Book.findByIdAndUpdate(req.params.id,{
            $set:{
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                price: req.body.price,
                cover: req.body.cover
            }
        },{new:true});
        res.status(200).json(updatedbook);
     
    }
);




/**
 * @description Delete a book
 * @access  private (only admin)
 * @method  Delete
 * @rout    /api/books/:id 
 */

const deleteBook = asyncHandler( async (req,res)=>{


    
    const book = await Book.findById(req.params.id);
    
    if(book){
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'book has been deleted'});
    
    }else{
        res.status(404).json({message:'book not deleted'});
    }
    
    });


module.exports = {
    getAllBooks,
    getBookById,
    creatBook,
    updateBook,
    deleteBook
}