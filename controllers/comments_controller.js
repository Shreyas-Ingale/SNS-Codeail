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