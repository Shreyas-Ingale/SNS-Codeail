const mongoose = require("mongoose");
// create schema for user sign up and usage
const userScehma = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
},{ // gives times at which account(upper 3 fields for a specific user) was created and then whenever it updates
    timestamp: true
});
// setting up this as a model/collection with name User
const User = mongoose.model('User', userScehma);

module.exports = User;
