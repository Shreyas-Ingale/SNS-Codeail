const express = require("express");
const router = express.Router();
const passport = require("passport");
// import a controller for handling comments 
const commentsController = require('../controllers/comments_controller');

// handle post request on form for comments through /create and also authenticate
router.post('/create', passport.checkAuthentication, commentsController.create);

// handle get request on form for comments through /destroy/:id and also authenticate
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

module.exports = router;