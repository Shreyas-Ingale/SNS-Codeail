const Post = require('../models/post');
const User = require('../models/user');

//export a home controller for respose to a request in Router & to render the homepage
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

    // render the posts - populate the user of each post and a comments user to display names
    // and send all the users to make them visible as friends
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec().then(function(posts){
        // console.log("here : ",req.user);
        User.find({}).then(function(users){
            return res.render('home', {
                title: "Home",
                posts: posts,
                all_users: users,
            });
        }).catch(function(error){
            console.log("Error while finding the Users", error);
        });
    }).catch(function(error){
        console.log("Error while finding Posts", error);
    });

}
