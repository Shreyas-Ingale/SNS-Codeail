const express = require('express'); // import express
const app = express();  // start express
const port = 8000; // default port for express server

// using Express Router to handle all requests
app.use('/', require('./routes'));

// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Start server and check if it's running or not
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the Server: ${err}`); // used interpolation using backtick " ` " 
    }

    console.log(`Server is running on Port : ${port}`);
})