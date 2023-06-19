const express = require("express"); 
// create a router const for exporting to other files
const router = express.Router();
// import a usersApi controller for handling actions on all the requests
const usersAPI = require('../../../controllers/api/v1/users_api');

// router to handle post request on /create-session 
router.post('/create-session', usersAPI.createSession);

// export this router
module.exports = router;