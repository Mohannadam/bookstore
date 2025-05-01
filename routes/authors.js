const express = require("express");
const router = express.Router();
const {getAllAuthor,getAuthorByID,addAuthor,deleteAuthors,updateAuthors} = require("../controller/authorsController");
const { verifytokenAndAdmin } = require("../middlewares/verifytoken");

// /api/authors
router.route("/").get(getAllAuthor).post(verifytokenAndAdmin,addAuthor);

// /api/authors/:id
router
  .route("/:id")
  .get(getAuthorByID)
  .put(verifytokenAndAdmin, updateAuthors)
  .delete(verifytokenAndAdmin, deleteAuthors);

module.exports = router;