// import mongoose odm
const mongoose = require('mongoose');
const env = require('./environment');
// connect it to a database
mongoose.connect(`mongodb://127.0.0.1/${env.db}`); // db name
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error conneting to MongoDB !"));
db.once('open', function(){
    console.log("Connected to MongoDB !");
});

module.exports = db;