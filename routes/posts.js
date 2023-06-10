const express = require("express");
const router = express.Router();
// import a controller for handling posts 
const postsController = require('../controllers/posts_controller');

// handle post request on form for posts through /create
router.post('/create', postsController.create);

module.exports = router;