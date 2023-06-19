const express = require("express"); 
// create a router const for exporting to other files
const router = express.Router();
// importing passport to handle authentication
const passport = require('passport');
// importing postApi controller for handling actions on all the post-api requests
const postsApi = require("../../../controllers/api/v1/posts_api");

// router to handle get request on this-/ 
router.get('/', postsApi.index);
// router to handle get request on this-/:id setting up passport-jwt, session is false so as to not 
// generate session cookies
router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);

// export this router
module.exports = router;