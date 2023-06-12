const Comment = require('../models/comment');
const Post = require('../models/post');

// check if the post is authentic and get the comment data add its id to post.comments and post id to comment schema
module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post, //post id
                user: req.user._id
            });
            post.comments.push(comment); //comment
            post.save();
            res.redirect('back')
        }
    } catch (error) {
        console.log("Error in Posting the Comment", error);
        return;
    };
}

// get the comment id from url and delete the comment and also its existence from that post's document
// only if the current user is comment's creator
module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id).populate('post');
        //check if current user is the one who has created this comment or the creator of the post
        if (comment.user == req.user.id || req.user.id == comment.post.user) {
            let postID = comment.post;
            comment.deleteOne(); // delete the comment
            let post = await Post.findByIdAndUpdate(postID, { $pull: { comments: req.params.id } });
            return res.redirect('back'); // delete the comment from post's document and redirect back
        }
        else {
            return res.redirect('back'); // upon failure redirect back w/o doing anything
        }
    } catch (error) {
        console.log("Error in Removing the Comment", error);
        return;
    };
}