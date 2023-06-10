const Post = require('../models/post');

//export a home controller for respose to a request in Router
module.exports.home = function(req, res){
    // res.cookie('crocodile_id', 20);
    console.log(req.cookies);

    // display all the posts by a user
    // Post.find({}).then(function(posts){
    //     return res.render('home', {
    //         title: "Home",
    //         posts: posts
    //     });
    // }).catch(function(error){
    //     console.log("Error while finding Posts", error);
    // });

    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec().then(function(posts){
        return res.render('home', {
            title: "Home",
            posts: posts
        });
    }).catch(function(error){
        console.log("Error while finding Posts", error);
    });

}
