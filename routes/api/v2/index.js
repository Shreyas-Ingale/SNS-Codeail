const express = require("express"); 
// create a router const for exporting to other files
const router = express.Router();
// import a controller for handling actions on all the requests

// tell v2 router to forward all route traffic for /posts/ to posts.js router
router.use('/posts', require('./posts'));

// export this router
module.exports = router;