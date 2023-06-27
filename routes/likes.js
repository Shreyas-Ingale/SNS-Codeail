const express = require("express");
const router = express.Router();
const passport = require("passport");
// import a controller for handling likes 
const likesController = require('../controllers/likes_controller');

// handle post request on button for likes through /toggle and also authenticate
router.post('/toggle', passport.checkAuthentication, likesController.toggleLike);

module.exports = router;