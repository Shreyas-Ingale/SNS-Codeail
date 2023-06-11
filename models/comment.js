const mongoose = require("mongoose");
// create schema for user posts
const commentScehma = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },//User to which the comment belongs to
    user: {
        type: mongoose.Schema.Types.ObjectId, //the unique id for each user console logged one ...
        ref: "User"
    },//Post to which the comment belongs to
    post: {
        type: mongoose.Schema.Types.ObjectId, //the unique id for each user console logged one ...
        ref: "Post"
    }
},{ // gives times at which account(upper fields for a specific user) was created and then whenever it updates
    timestamps: true
});
// setting up this as a model/collection with name Post
const Comment = mongoose.model('Comment', commentScehma);

module.exports = Comment;