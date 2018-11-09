const db = require('../base');
const util = require('../../util/util');

const connection = db.connection;
const status = db.status;

/**
 * 
 * @param {function} callback 
 * @param  {IArguments} args  consist of mainly, error, results, fields
 */
const returnCallback = function (callback, args) {
    let [error, results, fields] = [...args];
    callback(results,error,fields);
};


/**
 * 
 * @param {number} teacherId The teacher ID
 * @param {number} studentId the student ID
 * @param {function} callback The callback function to return the result
 */
const insertMap = function(teacherId, studentId, callback){
    var now = util.dateToMysqlFormat(new Date());
    connection.query("INSERT INTO map_teacher_students (`student_id`, `teacher_id`, `created_at`)" +
        "VALUES ( ?, ?, ?) ", [studentId, teacherId, now], function (){
            returnCallback(callback, arguments);
    })
};

const getStudentsByTeacher = function (email, callback, error){
    const query = "select s.email from map_teacher_students mts "+
      "inner join teachers t on mts.teacher_id = t.id " +
      "inner join students s on mts.student_id = s.id " +
    "where t.email = ?";

    
    connection.query(query,[email], function(){
        returnCallback(callback, arguments);
    })
};

module.exports = {
    insertMap,
    getStudentsByTeacher,
    connection
};





