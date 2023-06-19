const express = require("express"); 
// create a router const for exporting to other files
const router = express.Router();
// import a controller for handling actions on all the requests

// tell v1 router to forward all route traffic for /posts/ to posts.js router
router.use('/posts', require('./posts'));
// tell v1 router to forward all route traffic for /users/ to users.js router
router.use('/users', require('./users'));

// export this router
module.exports = router;