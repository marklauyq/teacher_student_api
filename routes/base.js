/**
 * This will contain all routes that is not attached to a model in the database
 */
const validator = require('email-validator');
const express = require('express');
const map = require('../db/service/map');
const dbStudent = require('../db/models/students');
const dbMap = require('../db/models/map_teacher_students');
const router = express.Router();


/**
 * A teacher can register multiple students. 
 */
router.post('/register', function (req, res) {
    //get the post data
    let post = req.body;

    let teacher = post['teacher'];
    let students = post['student'];

    map.mapTeacherToStudent(teacher, students, (result) => {
        res.send(result);
    }, function (error) {
        res.status(400).send({
            message: error.message
        });
    });
});

/**
 * Find all students that is attached to a teacher
 */
router.get('/commonstudents', function(req, res){

    let teacher = req.query['teacher'];

    if(teacher === undefined)
        res.status(400).send({message:"Missing query parameter: teacher"});

    map.getStudentsByTeacher(teacher, (result)=>{
        res.send(result);
    },(error)=>{
        res.status(400).send({message:error});
    });    
});


router.post('/suspend', function(req,res){
    let student = req.body['student'];

    if(student === undefined)
        res.status(400).send({message:"Missing student variable in post body"});

    if(!validator.validate(student))
        res.status(400).send({message:`Invalid email sent ${student}`});


    let studentPromise = new Promise(function(resolve, reject){
        dbStudent.getStudentsByEmail(student, function(result, error){
            if(error){
                reject(error);
                return;
            }

            if(result.length === 0){
                reject("Student does not exist in system");
                return;
            }

            resolve(result[0]);
        })
    });


    studentPromise.then(function(student){
        dbStudent.suspendStudent(student.id, function(result, error){
            if(error){
                res.status(400).send({message:"Unable to suspend", details: error});
            }
            res.send(`Student ${student.email} has been suspended`);
        });
    }).catch(function(error){
        res.status(400).send({message:error});
    });
});

/**
 *
 */
router.post('/retrievefornotifications', function(req,res){
    let post = req.body;

    let teacher = post['teacher'];
    let notification = post['notification'];

    if(!validator.validate(teacher)){
        res.status(400).send({
            message:"Invalid email address"
        });
    }

    //look for the @ emails
    //first we will split the text up
    let notificationArray = notification.split(' ');

    let emails = [];
    notificationArray.forEach(function(word){
        if(word[0] === '@' && validator.validate(word.substr(1))){
            emails.push(word.substr(1));

            //insert student if not in our system??
        }
    });

    dbMap.getStudentsByTeacher(teacher, function(result, error){
        if(error){
            res.status(400).send(error);
        }

        result.forEach(function(student){
            if(!emails.includes(student.email)){
                emails.push(student.email);
            }
        });

        res.send({
            recipients: emails
        });
    });

});

module.exports = router;