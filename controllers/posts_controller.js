const Post = require('../models/post');

// get the Data of the Post and Store it in postSchema
module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(function() {
        return res.redirect('back'); // upon success redirect back
    }).catch(function (error) {
        console.log("Error in Creating the Post", error);
        return;
    });
}