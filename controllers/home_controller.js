const Post = require('../models/post');
const User = require('../models/user');

//export a home controller for respose to a request in Router & to render the homepage
module.exports.home = async function (req, res) {
    console.log(req.cookies);
    // render the posts - populate the user of each post and a comments user to display names
    // and send all the users to make them visible as friends
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

        let users = await User.find({});

        return res.render('home', {
            title: "Home",
            posts: posts,
            all_users: users,
        });

    } catch(error) {
        console.log("Error while finding Posts/Users :", error);
    }
}
