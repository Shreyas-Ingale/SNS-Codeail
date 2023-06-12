const Post = require('../models/post');
const Comment = require('../models/comment');

// get the Data of the Post and Store it in postSchema
module.exports.create = async function (req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back'); // upon success redirect back
    } catch (error) {
        console.log("Error in Creating the Post", error);
        return;
    }
}

// get the post id from url and delete the post and its comments if the current user is post's creator
module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) { //check if current user is the one who has created this post
            post.deleteOne();
            await Comment.deleteMany({ post: req.params.id });
            return res.redirect('back'); // delete all the comments on the post and redirect back
        }
        else {
            return res.redirect('back'); // upon failure redirect back w/o doing anything
        }

    } catch (error) {
        console.log("Error in Removing the Post", error);
        return;
    }
}