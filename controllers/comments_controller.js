const Comment = require('../models/comment');
const Post = require('../models/post');

// check if the post is authentic and get the comment data add its id to post.comments and post id to comment schema
module.exports.create = function (req, res) {
    Post.findById(req.body.post).then(function(post) {
       if(post){
        Comment.create({
            content: req.body.content,
            post: req.body.post, //post id
            user: req.user._id
        }).then(function(comment) {
            post.comments.push(comment); //comment
            post.save();
            res.redirect('back');
        }).catch(function (error) {
            console.log("Error in Posting the Comment", error);
            return;
        });
       } 
    }).catch(function (error) {
        console.log("Error in Finding the Post", error);
        return;
    });
}

// get the comment id from url and delete the comment and also its existence from that post's document
// only if the current user is comment's creator
module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id).populate('post').then(function (comment) {
        //check if current user is the one who has created this comment or the creator of the post
        if (comment.user == req.user.id || req.user.id == comment.post.user) { 
            let postID = comment.post;
            comment.deleteOne(); // delete the comment
            Post.findByIdAndUpdate(postID,{$pull: {comments: req.params.id}})
            .then(function () {
                return res.redirect('back'); // delete the comment from post's document and redirect back
            }).catch(function (error) {
                console.log("Error in Removing the Comments of the Post", error);
                return;
            });
        }
        else {
            return res.redirect('back'); // upon failure redirect back w/o doing anything
        }
    }).catch(function (error) {
        console.log("Error in Removing the Comment", error);
        return;
    });
}