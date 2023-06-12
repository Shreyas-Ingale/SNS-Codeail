const User = require('../models/user');

//render the profile page of a user 
module.exports.profile = function (req, res) {
    User.findById(req.params.id).then(function (user) {
        return res.render('user_profile', {
            title: "Profile",
            profile_user: user
        });
    }).catch(function (error) {
        console.log("Error in finding the User in DB", error);
        return;
    });
}

// get the current user id and it machtes with the page's user id then update info else send 401
module.exports.update = function (req, res) {
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body).then(function (user) {
            return res.redirect('back'); //successful redirect back
        }).catch(function (error) {
            console.log("Error in finding the User in DB", error);
            return;
        });
    } else {
        return res.status(401).send('Unauthorized'); //unsuccessful send error 401
    }
}

// dummy never called
module.exports.posts = function (req, res) {
    return res.render('users', {
        title: "Posts"
    });
}
// render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) { // redirect to the profile page if user is already signed up
        return res.redirect('/users/profile/' + req.user.id);
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) { // redirect to the profile page if user is already signed in
        return res.redirect('/users/profile/' + req.user.id);
    }

    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// get the sign up data and create account
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }).then(function (user) {
        if (!user) {
            User.create(req.body).then(function (user) {
                return res.redirect('/users/sign-in');
            }).catch(function (error) {
                console.log("Error in storing the User in DB", error);
                return;
            });
        }
        else {
            return res.redirect('back');
        }
    }).catch(function (error) {
        console.log("Error in finding the User in DB", error);
        return;
    });
}

// get the sign in data and create a session for the user and redirect to profile page
module.exports.createSession = function (req, res) {
    return res.redirect('/users/profile/' + req.user.id);
}

// get the sign in data and destroy the session for the user and log out and redirect to home page
module.exports.destroySession = function (req, res) {
    req.logout(function (err) { // function from passport to logout the session/user
        if (err) { return next(err); }
        return res.redirect('/');
    });
}

// not using async await scine only onr call is being made per function !!