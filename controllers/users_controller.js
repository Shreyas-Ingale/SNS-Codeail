const User = require('../models/user');

module.exports.profile = function (req, res) {
    return res.render('users', {
        title: "Profile"
    });
}

module.exports.posts = function (req, res) {
    return res.render('users', {
        title: "Posts"
    });
}
// render the sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// get the sign up data and create 
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }).then(function (user) {
        if (!user) {
            User.create(req.body).then(function(user){
                return res.redirect('/users/sign-in');
            }).catch(function (error) {
                console.log("Error in storing the User in DB", error);
                return;
           });
        }
        else{
            return res.redirect('back');
        }
    }).catch(function (error) {
        console.log("Error in finding the User in DB", error);
        return;
    });
}

// get the sign in data and create a session for the user
module.exports.createSession = function (req, res) {

}