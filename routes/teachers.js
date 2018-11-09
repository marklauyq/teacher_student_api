var express = require('express');
var router = express.Router();

/**
 * Get a list of all the teachers
 */
router.get('/', function(req, res) {
    res.send({'hello': 'worlds'});
});


/**
 * Create a teacher
 */
router.post('/', function (reg,res){

});




module.exports = router;

