const express = require('express');
const router = express.Router();
const { verifytokenAndAdmin } = require('../middlewares/verifyToken');//+
const {getAllBooks,getBookById,creatBook,updateBook,deleteBook} = require('../controller/bookController');  


// Best Way  

// api books
router.route("/")
      .get(getAllBooks)
      .post( verifytokenAndAdmin,creatBook);

        
// api books/:id
router.route("/:id")
      .get(getBookById)
      .put(verifytokenAndAdmin ,updateBook)
       .delete(verifytokenAndAdmin,deleteBook);



// good WAY:

// router.get('/',getAllBooks);
 
// router.get('/:id', getBookById);

// router.post('/', verifytokenAndAdmin,creatBook);

// router.put('/:id', verifytokenAndAdmin ,updateBook);

// router.delete('/:id', verifytokenAndAdmin,deleteBook);





module.exports = router;