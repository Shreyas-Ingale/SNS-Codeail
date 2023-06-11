const express = require("express");
const router = express.Router();
const passport = require("passport");
// import a controller for handling posts 
const postsController = require('../controllers/posts_controller');

// handle post request on form for posts through /create and also authenticate
router.post('/create', passport.checkAuthentication, postsController.create);

// handle get request on form for posts through /destroy/:id and also authenticate
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

module.exports = router;