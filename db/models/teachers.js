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

    callback(results, error,fields);
};


/**
 * 
 * @param {function} callback 
 */
const getTeachers = function(callback){
    connection.query("select * from teachers", function (){
        returnCallback(callback, arguments)
    });
};

/**
 * 
 * @param {object} data Contains all the details to be inserted
 * @param {function} callback callback function to retrieve results
 */
const insertTeacher = function(data, callback){
    let now = util.dateToMysqlFormat(new Date());
    connection.query("INSERT INTO teachers (`username`, `email`, `created_at`)" +
        "VALUES ( ?, ?, ?) ", [data.username, data.email, now], function (){
        returnCallback(callback, arguments)
    });
};

/**
 * 
 * @param {number} id 
 * @param {function} callback 
 */
const getTeacher = function (id, callback){
    connection.query("select * from teachers where id = ? ", [id], function (){
        returnCallback(callback, arguments)
    });
};

/**
 * To retrieve the teacher based on the email address	
 * @param {string} email The email address to search
 * @param {function} callback the call back function to return the resut
 */
const getTeacherByEmail = function (email, callback){
    connection.query("select * from teachers where email = ? ", [email],function (){
        returnCallback(callback, arguments)
    });
};

/**
 * To delete a teacher by ID 
 * @param {number} id The id of the teacher
 * @param {function} callback Callback function to return the results
 */
var deleteTeacher = function(id, callback){
    connection.query("delete from students where id = ?", [id], function (){
        returnCallback(callback, arguments)
    });
}

module.exports = {
    getTeachers,
    insertTeacher,
    getTeacher,
    getTeacherByEmail,
    deleteTeacher,
};

