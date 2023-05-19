const express = require("express");
const router = express.Router();
// import a controller for handling actions on /users 
const usersController = require('../controllers/users_controller');
// handle actions of get on /users/profile
router.get('/profile', usersController.profile);
// handle actions of get on /users/posts
router.get('/posts', usersController.posts);

module.exports = router;