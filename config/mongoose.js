// import mongoose odm
const mongoose = require('mongoose');
// connect it to a database
mongoose.connect('mongodb://127.0.0.1/codeial_development');
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error conneting to MongoDB !"));
db.once('open', function(){
    console.log("Connected to MongoDB !");
});

module.exports = db;