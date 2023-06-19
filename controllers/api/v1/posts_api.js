const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {
    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        return res.status(200).json({
            message: "List of all Posts in V1",
            posts: posts
        });

    } catch (error) {
        console.log("Error while finding Posts/Users :", error);
        return res.status(500).json({
            message: "Internal Server Error!"
        });
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) { //check if current user is the one who has created this post
            post.deleteOne();
            await Comment.deleteMany({ post: req.params.id });
            return res.status(200).json({
                message: "Post and it's comments deleted!"
            }); 
        }
        else {
            return res.status(401).json({
                message: "You cannot Delete this Post!"
            }); 
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error!"
        }); 
    }
}