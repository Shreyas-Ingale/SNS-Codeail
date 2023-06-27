const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');

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
            // if we want to populate just the name and email  of the user (we'll not want to send the password in the API), this is how we do it!
            comment = await comment.populate('user', 'name email');
            // // send mail to the comment owner about the comment
            commentMailer.newComment(comment);
            //assign the above email job to the kue(queue) 
            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log("Error in Creating a Kue(queue)", err);
                    return;
                }
                console.log("Job Enqueued Successfully :", job.id);
            });
            // on ajax req send the data to views on client side if no error
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment Posted!"
                });
            }
            req.flash('success', 'Comment Posted!');
            res.redirect('back')
        }
    } catch (error) {
        req.flash('error', "Error in Completing the Task in DB");
        console.log(error);
        return res.redirect('back');
    };
}

// get the comment id from url and delete the comment and also its existence from that post's document
// only if the current user is comment's creator
module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id).populate('post', 'id');
        //check if current user is the one who has created this comment or the creator of the post
        if (comment.user == req.user.id || req.user.id == comment.post.user) {
            let postID = comment.post;
            comment.deleteOne(); // delete the comment
            let post = await Post.findByIdAndUpdate(postID, { $pull: { comments: req.params.id } });

            //delete the likes asssociated with this commment
            await Like.deleteMany({likedModel: comment._id, onModel: 'Comment'});
            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment Removed !"
                });
            }
            req.flash('success', "Comment Removed!");
            return res.redirect('back'); // delete the comment from post's document and redirect back
        }
        else {
            req.flash('error', "Unauthorized Activity: Not allowed to delete the comment");
            return res.redirect('back'); // upon failure redirect back w/o doing anything
        }
    } catch (error) {
        req.flash('error', "Error in Finding the Content in DB");
        console.log(error);
        return res.redirect('back');
    };
}