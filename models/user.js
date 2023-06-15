const mongoose = require("mongoose");
const multer = require('multer'); // to upload files ..
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
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
    },
    avatar: {
        type: String
    }
}, { // gives times at which account(upper 3 fields for a specific user) was created and then whenever it updates
    timestamps: true
});

// setting up multer for file storage in localstorage of the pc
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // path to avatars folder insde the uploads/users from current file user.js
        cb(null, path.join(__dirname, '..', AVATAR_PATH)); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
// using static method and variable
// attach the above diskStorage object to the storage object of multer and
// using single to say that only one file of name avatar will be accepted from req.file not many
userScehma.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
// making the avatar_path global to be accessible frok the controller
userScehma.statics.avatarPath = AVATAR_PATH;

// setting up this as a model/collection with name User
const User = mongoose.model('User', userScehma);

module.exports = User;
