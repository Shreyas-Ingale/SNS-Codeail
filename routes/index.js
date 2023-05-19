// import express but this pass give the same instance which was created in OG Index.js file 
const express = require("express"); 
// create a router const for exporting to other files
const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log('Router Loaded Successfully');

// homeController controller will perform the action in .home as a response to the get request on '/'
router.get('/', homeController.home);

router.get('/profile', homeController.profile);

// export this router
module.exports = router;