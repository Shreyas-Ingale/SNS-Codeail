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
// handle actions of post on /sign-ui through /sign-up/create-session
router.post('/sign-in/create-session', passport.authenticate(
    'local', // stratergy name
    {
        failureRedirect: '/users/sign-in'   // middleware is the 2nd optional arguement of post
    }
), usersController.createSession);

// handle the action of get on /sign-out 
router.get('/sign-out', usersController.destroySession);

module.exports = router;