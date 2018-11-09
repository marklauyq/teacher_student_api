/**
 * This will contain all routes that is not attached to a model in the database
 */


var express = require('express');
var router = express.Router();

/**
 * this is the student routes
 */
router.post('/register', function(req, res) {
    res.send("test");
});

module.exports = router;