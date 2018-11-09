/**
 * This will contain all routes that is not attached to a model in the database
 */


var express = require('express');
var map = require('../db/models/map_teacher_students');
var router = express.Router();


/**
 * A teacher can register multiple students. 
 */
router.post('/register', function (req, res) {
    //get the post data
    let post = req.body;

    let teacher = post.teacher
    let students = post.students;

    try {
        map.mapTeacherToStudent(teacher, students, (result) => {

            
            res.send(result);
        });
    } catch (error) {
        res.status(400).send({
            message:error.message
        });
    }
});

module.exports = router;