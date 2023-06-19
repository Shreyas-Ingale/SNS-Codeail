const express = require("express"); 
// create a router const for exporting to other files
const router = express.Router();

// tell the api router to forward all route traffic for /v1/ to v1's index.js router
router.use('/v1', require('./v1'));

// tell the api router to forward all route traffic for /v2/ to v2's index.js router
router.use('/v2', require('./v2'));

module.exports = router;