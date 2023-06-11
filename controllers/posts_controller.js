const Post = require('../models/post');
const Comment = require('../models/comment');

// get the Data of the Post and Store it in postSchema
module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(function () {
        return res.redirect('back'); // upon success redirect back
    }).catch(function (error) {
        console.log("Error in Creating the Post", error);
        return;
    });
}

// get the post id from url and delete the post and its comments if the current user is post's creator
module.exports.destroy = function (req, res) {
    Post.findById(req.params.id).then(function (post) {
        if (post.user == req.user.id) { //check if current user is the one who has created this post
            post.deleteOne();
            Comment.deleteMany({ post: req.params.id }).then(function () {
                return res.redirect('back'); // delete all the comments on the post and redirect back
            }).catch(function (error) {
                console.log("Error in Removing the Comments of the Post", error);
                return;
            });
        }
        else {
            return res.redirect('back'); // upon failure redirect back w/o doing anything
        }
    }).catch(function (error) {
        console.log("Error in Removing the Post", error);
        return;
    });
}