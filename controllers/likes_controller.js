const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function (req, res) {
    try {
        let likedModel; //model on which like is posted
        let isDeleted = false; // is the like removed or added
        //url : likes/toggle/?id=_id&type=onModel
        if (req.query.type == 'Post') { // decide based on query-type which value likedModel gets
            likedModel = await Post.findById(req.query.id).populate('likes');
        } else {// populating likes array to make changes in it
            likedModel = await Comment.findById(req.query.id).populate('likes');
        }
        // check if a like already existed on that likedModel
        let existingLike = await Like.findOne({
            user: req.user._id,
            likedModel: req.query.id,
            onModel: req.query.type
        });
        // if yes then remove that like from likedModels likes array in DB
        if (existingLike) {
            likedModel.likes.pull(existingLike._id);
            likedModel.save();
            existingLike.deleteOne();
            isDeleted = true;
        } else { // if no then create the like and add it to likes array of likedModel
            let like = await Like.create({
                user: req.user._id,
                likedModel: req.query.id,
                onModel: req.query.type
            });

            likedModel.likes.push(like);
            likedModel.save();
        }
        // return as done
        return res.status(200).json({
            data: {
                isDeleted: isDeleted
            },
            message: "Request Successful!"
        });
    } catch (error) {
        req.flash('error', "Error in Completing the Task in DB");
        console.log(error);
        return res.redirect('back');
    };
}