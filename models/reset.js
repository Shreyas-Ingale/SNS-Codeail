const mongoose = require("mongoose");
// create schema for reset passsword
const resetScehma = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //the unique id for each user console logged one ...
        required: true,
        ref: "User"
    },//the accesstoken generated 
    accessToken: {
        type: String, 
        required: true,
        unique: true
    },//to check if the token is valid or not
    isValid: {
        type: Boolean,
        required: true
    }
},{ // gives times at which account(upper fields for a specific user) was created and then whenever it updates
    timestamps: true
});
// setting up this as a model/collection with name Post
const Reset = mongoose.model('Reset', resetScehma);

module.exports = Reset;