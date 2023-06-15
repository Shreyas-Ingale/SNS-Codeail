const User = require('../models/user');
const fs = require('fs');
const path = require('path');

//render the profile page of a user 
module.exports.profile = function (req, res) {
    User.findById(req.params.id).then(function (user) {
        return res.render('user_profile', {
            title: "Profile",
            profile_user: user
        });
    }).catch(function (error) {
        req.flash('error', "Error in Finding the User in DB");
        console.log(error);
        return res.redirect('back');
    });
}

// get the current user id and it machtes with the page's user id then update info else send 401
module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log('****** Multer Error ****** : ',err);}
                user.name = req.body.name;
                user.email = req.body.email;
                // if their is a file(pfp) in the form save it to the avatars dir
                // and if one already exists replace it with new one
                if(req.file){
                    // if avatar exists for a user and the file as well delete it
                    if(user.avatar){
                        if(fs.existsSync(path.join(__dirname, '..', user.avatar))){
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        }
                        // if only avatar value is set but file doesnt exists empty the avatar field
                        else{
                            user.avatar = "";
                        }
                    }

                    //this saves the path of the uploaded file into avatar field in the User (schema)
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash('success', "User Details Updated!");
                return res.redirect('back'); //successful redirect back
            });
        }catch(error){
            req.flash('error', "Error in Finding the User in DB");
            console.log(error);
            return res.redirect('back');
        }
    } else {
        req.flash('error', "UnAuthorized");
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
        req.flash('error', "Passwords do not match!");
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }).then(function (user) {
        if (!user) {
            User.create(req.body).then(function (user) {
                req.flash('success', "Account Created Successfully!");
                return res.redirect('/users/sign-in');
            }).catch(function (error) {
                req.flash('error', "Error in storing the User in DB");
                console.log(error);
                return res.redirect('back');
            });
        }
        else {
            return res.redirect('back');
        }
    }).catch(function (error) {
        req.flash('error', "Error in Finding the User in DB");
        console.log(error);
        return res.redirect('back');
    });
}

// get the sign in data and create a session for the user and redirect to profile page
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully !!'); // flash message
    return res.redirect('/users/profile/' + req.user.id);
}

// get the sign in data and destroy the session for the user and log out and redirect to home page
module.exports.destroySession = function (req, res) {
    req.logout(function (err) { // function from passport to logout the session/user
        if (err) { return next(err); }
        req.flash('success', 'Logged Out Successfully !!'); // flash message
        return res.redirect('/');
    });
}

// not using async await scine only onr call is being made per function !!