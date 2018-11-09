var express = require('express');
var router = express.Router();

const students = [
    {
        'name': 'John',
        'age': "30",
        'email': 'email@example.com'
    },
    {
        'name': 'Jane',
        'age': "30",
        'email': 'email@example.com'
    },
    {
        'name': 'Jim',
        'age': "30",
        'email': 'email@example.com'
    },
    {
        'name': 'Jack',
        'age': "30",
        'email': 'email@example.com'
    },
];

/**
 * this is the student routes
 */
router.get('/', function(req, res) {
    res.send(students);
});

module.exports = router;