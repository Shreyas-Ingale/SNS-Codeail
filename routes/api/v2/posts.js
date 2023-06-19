const express = require("express"); 
// create a router const for exporting to other files
const router = express.Router();
// importing postApi controller for handling actions on all the post-api requests
const postsApi = require("../../../controllers/api/v2/posts_api");

// router to handle get request on this-/ 
router.get('/', postsApi.index);
// export this router
module.exports = router;