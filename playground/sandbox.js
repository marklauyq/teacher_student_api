// const util = require('../util/util.js');


// util.log("Welcome to the playground");

// const routes = require('../controllers/routes');

// console.log(routes.teachers.name);


var rewire = require('rewire');
var student = require('../db/models/students')



student.getStudent(1, (error, results,fields) => {
    console.log(results);
 });