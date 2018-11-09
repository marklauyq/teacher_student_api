/**
 * This will contain all routes that is not attached to a model in the database
 */


var express = require('express');
var map = require('../db/service/map');
var router = express.Router();


/**
 * A teacher can register multiple students. 
 */
router.post('/register', function (req, res) {
    //get the post data
    let post = req.body;

    let teacher = post.teacher
    let students = post.students;


    map.mapTeacherToStudent(teacher, students, (result) => {


        res.send(result);
    }, function (error) {
        res.status(400).send({
            message: error.message
        });
    });
});


router.get('/commonstudents', function(req, res){

    let teacher = req.query.teacher;

    if(teacher === undefined)
        res.status(400).send({message:"Missing query parameter: teacher"});

    map.getStudentsByTeacher(teacher, (result)=>{
        res.send(result);
    },(error)=>{
        res.status(400).send({message:error});
    });    
    

});

module.exports = router;