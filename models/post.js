const mongoose = require("mongoose");
// create schema for user posts
const postScehma = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, //the unique id for each user console logged one ...
        ref: "User"
    },//include array of ids of all comments on this post in the schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, //the unique id for each user console logged one ...
            ref: "Comment"
        }
    ]
}, { // gives times at which account(upper fields for a specific user) was created and then whenever it updates
    timestamps: true
});
// setting up this as a model/collection with name Post
const Post = mongoose.model('Post', postScehma);

module.exports = Post;
