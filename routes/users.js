const express = require("express");
const router = express.Router();
const passport = require('passport');
// import a controller for handling actions on /users 
const usersController = require('../controllers/users_controller');
// handle actions of get on /users/profile with a custom middleware to check if user has signed-in
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
// handle actions of get on /users/update with a custom middleware to check if user has signed-in
router.post('/update/:id', passport.checkAuthentication, usersController.update);
// handle actions of get on /users/posts
router.get('/posts', usersController.posts);
// handle actions of get on /sign-up
router.get('/sign-up', usersController.signUp);
// handle actions of get on /sign-in
router.get('/sign-in', usersController.signIn);
// handle actions of post on /sign-up through /sign-up/create
router.post('/sign-up/create', usersController.create);
// handle actions of post on /sign-in through /sign-in/create-session
router.post('/sign-in/create-session', passport.authenticate(
    'local', // stratergy name
    {
        failureRedirect: '/users/sign-in'   // middleware is the 2nd optional arguement of post
    }
), usersController.createSession);

// handle the action of get on /sign-out 
router.get('/sign-out', usersController.destroySession);

//handle actions of get on /auth/google (made by passport) 
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
//handle actions of get on /auth/google/callback (made by google)
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);

// handle the routes for reset password
router.get('/forget-password',usersController.forget);
router.post('/verify', usersController.verify);
router.get('/reset-pass/', usersController.resetPass);
router.post('/confirm-reset/', usersController.confirmReset);

// handle the routes for friendship handling
router.get('/create_friend/:friendId', passport.checkAuthentication, usersController.createFriends);
router.get('/remove_friend/:friendId', passport.checkAuthentication, usersController.deleteFriends);
router.get('/remove_req/:friendId', passport.checkAuthentication, usersController.deleteReq);
router.get('/accept_req/:friendId', passport.checkAuthentication, usersController.acceptReq);
router.get('/message_friend/:friendId', passport.checkAuthentication, usersController.messageFriend);

module.exports = router;