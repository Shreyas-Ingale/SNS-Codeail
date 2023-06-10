const express = require("express");
const router = express.Router();
const passport = require("passport");
// import a controller for handling posts 
const postsController = require('../controllers/posts_controller');

// handle post request on form for posts through /create and also authenticate
router.post('/create', passport.checkAuthentication, postsController.create);

module.exports = router;