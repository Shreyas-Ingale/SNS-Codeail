const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const JWT = require('jsonwebtoken');
const Reset = require('../models/reset');
const resetMailer = require('../mailers/reset_password_mailer'); 
const Friendship = require('../models/friendship');

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
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log('****** Multer Error ****** : ', err); }
                user.name = req.body.name;
                user.email = req.body.email;
                // if their is a file(pfp) in the form save it to the avatars dir
                // and if one already exists replace it with new one
                if (req.file) {
                    // if avatar exists for a user and the file as well delete it
                    if (user.avatar) {
                        if (fs.existsSync(path.join(__dirname, '..', user.avatar))) {
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        }
                        // if only avatar value is set but file doesnt exists empty the avatar field
                        else {
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
        } catch (error) {
            req.flash('error', "Error in Finding the User in DB");
            console.log(error);
            return res.redirect('back');
        }
    } else {
        req.flash('error', "UnAuthorized");
        return res.status(401).send('Unauthorized_Macha'); //unsuccessful send error 401
    }
}

// dummy never called
module.exports.posts = function (req, res) {
    return res.render('users', {
        title: "Posts"
    });
}

module.exports.forget = async function (req, res) {

    return res.render('verifymail', {
        title: "Verify email"
    })
}

module.exports.verify = async function (req, res) {
    let user = await User.findOne({ email: req.body.email });
    // console.log(user)
    if (user) {
        let token = JWT.sign(user.toJSON(), 'codeial', { expiresIn: '600s' });
        let reset = await Reset.create({
            user: user,
            accessToken: token,
            isValid: true
        });
        req.flash('success', 'Rest link has been sent to your email id')
        let data = {
            token: token,
            user: user
        }
        resetMailer.newReset(data); 
        return res.render('verified', {
            title: "verifid"
        })
    } else {
        req.flash('error', 'Enter your registered email id')
        return res.redirect('back')
    }

}
module.exports.resetPass = async function (req, res) {
    let token = req.query.accessToken
    let reset = await Reset.findOne({ accessToken: token });
    if (reset && reset.isValid) {
        return res.render('resetform', {
            title: "Reset password",
            token: req.query.accessToken,
        })
    } else {
        req.flash('error', 'Time Limit Exceeded')
        return res.send('<h1>Tocken has Expired</h1>')
    }

}
module.exports.confirmReset = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', "Passwords do not match!");
        return res.redirect('back');
    }
    let token = req.query.accessToken
    let reset = await Reset.findOne({ accessToken: token });
    await Reset.findOneAndUpdate({ "accessToken": token }, { $set: { "isValid": false } });
    let user = await User.findByIdAndUpdate(reset.user, { password: req.body.password });
    req.flash('success', 'Password has been reset')
    return res.redirect('/users/sign-in')

}

module.exports.createFriends = async function (req, res) {
    if (!(req.user.sent.includes(req.params.friendId))) {
        let upda = await User.findOneAndUpdate({ _id: req.user.id }, { $push: { sent: req.params.friendId } });
    }
    let frnd = await User.findOne({ _id: req.params.friendId });
    if (!(frnd.pending.includes(req.user.id))) {
        frnd.pending.push(req.user.id);
        frnd.save();
    }
    return res.redirect('back')

}
module.exports.deleteReq = async function (req, res) {
    if (req.user.sent.includes(req.params.friendId)) {
        let upda = await User.findOneAndUpdate({ _id: req.user.id }, { $pull: { sent: req.params.friendId } });
    }
    let frnd = await User.findOne({ _id: req.params.friendId });
    if ((frnd.pending.includes(req.user.id))) {
        await User.findOneAndUpdate({ _id: req.params.friendId }, { $pull: { pending: req.user.id } });
    }
    return res.redirect('back')
}


module.exports.acceptReq = async function (req, res) {
    let frnd = await User.findOne({ _id: req.params.friendId });
    if (req.user.pending.includes(req.params.friendId) && frnd.sent.includes(req.user.id)) {
        await User.findOneAndUpdate({ _id: req.user.id }, { $pull: { pending: req.params.friendId } });
        await User.findOneAndUpdate({ _id: req.params.friendId }, { $pull: { sent: req.user.id } });
    }
    if (!(frnd.friendships.includes(req.user.id)) && !(req.user.friendships.includes(req.params.friendId))) {
        await User.findOneAndUpdate({ _id: req.params.friendId }, { $push: { friendships: req.user.id } });
        await User.findOneAndUpdate({ _id: req.user.id }, { $push: { friendships: req.params.friendId } });
    }
    return res.redirect('back')
}


module.exports.deleteFriends = async function (req, res) {
    let frnd = await User.findOne({ _id: req.params.friendId });
    if ((frnd.friendships.includes(req.user.id)) && (req.user.friendships.includes(req.params.friendId))) {
        await User.findOneAndUpdate({ _id: req.params.friendId }, { $pull: { friendships: req.user.id } });
        await User.findOneAndUpdate({ _id: req.user.id }, { $pull: { friendships: req.params.friendId } });
    }
    return res.redirect('back')
}


module.exports.messageFriend = async function (req, res) {
    let messagefriend = await User.findById(req.params.friendId);
    if (req.xhr) {
        // console.log(messagefriend)
        return res.status(200).json({
            user: messagefriend.email,
            message:"User found",
        },
       
        )
    }else{
        return res.status(400).json({
            message:"User not found",
        })
    }
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