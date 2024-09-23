const express = require('express');
const logger = require("./middlewares/logger");
const {notFound,errorHandler} = require('./middlewares/errors.js');
 require('dotenv').config();
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt'); 
const connectTodb = require('./config/db.js');


// connection to database
connectTodb();

// init App
const app  = express();

// Apply middlewares
app.use(express.json()); 
app.use(logger);     //to make express read json file

// routes
app.use('/api/books',require('./routes/books'));
app.use('/api/authors',require('./routes/authors'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/users',require('./routes/usres.js') );

// error handeller
app.use(notFound);
app.use(errorHandler);

// Running the server
app.listen(port, () => { console.log(`Server is running in ${port} mode on port ${port}`); });