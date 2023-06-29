const Post = require('../models/post');
const User = require('../models/user');
const Chat = require('../models/chat');

//export a home controller for respose to a request in Router & to render the homepage
module.exports.home = async function (req, res) {
    console.log(req.cookies);
    // render the posts - populate the user of each post and a comments user to display names
    // and send all the users to make them visible as friends also populate likes of each post
    // and likes of each comment of the post
    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate: {
                    path: 'likes'
                }
            }).populate('comments') //comments array to access likes array of each comment
            .populate('likes'); // likes array present in each comment

        let users = await User.find({});
        let chats = await Chat.find({});
        return res.render('home', {
            title: "Home",
            posts: posts,
            all_users: users,
            chats: chats
        });

    } catch(error) {
        console.log("Error while finding Posts/Users :", error);
    }
}
