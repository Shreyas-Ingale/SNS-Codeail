const express = require('express'); // import express
const app = express();  // start express
const port = 8000; // default port for express server

// check is server is running or not
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the Server: ${err}`); // used interpolation using backtick " ` " 
    }

    console.log(`Server is running on Port : ${port}`);
})