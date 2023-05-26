const express = require("express");
const router = express.Router();
// import a controller for handling actions on /users 
const usersController = require('../controllers/users_controller');
// handle actions of get on /users/profile
router.get('/profile', usersController.profile);
// handle actions of get on /users/posts
router.get('/posts', usersController.posts);

// handle actions of get on /sign-up
router.get('/sign-up', usersController.signUp)
// handle actions of get on /sign-in
router.get('/sign-in', usersController.signIn)

router.post('/sign-up/create', usersController.create)

module.exports = router;