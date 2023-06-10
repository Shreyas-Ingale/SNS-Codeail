const express = require("express");
const router = express.Router();
const passport = require("passport");
// import a controller for handling comments 
const commentsController = require('../controllers/comments_controller');

// handle post request on form for comments through /create and also authenticate
router.post('/create', passport.checkAuthentication, commentsController.create);

module.exports = router;