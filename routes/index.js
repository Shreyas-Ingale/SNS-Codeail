// import express but this pass give the same instance which was created in OG Index.js file 
const express = require("express"); 
// create a router const for exporting to other files
const router = express.Router();
// import a controller for handling actions on all the requests
const homeController = require('../controllers/home_controller');
console.log('Router Loaded Successfully');

// homeController controller will perform the action in .home as a response to the get request on '/'
router.get('/', homeController.home);
// tell main router to forward all route traffic for /users/ to users.js router
router.use('/users', require('./users'));
// tell main router to forward all route traffic for /posts/ to posts.js router
router.use('/posts', require('./posts'));
// tell main router to forward all route traffic for /comments/ to comments.js router
router.use('/comments', require('./comments'));
// tell main router to forward all route traffic for /likes/ to likes.js router
router.use('/likes', require('./likes'));

// tell main router to forward all route traffic for /api/ to api ka index.js router
router.use('/api', require('./api'));

// export this router
module.exports = router;