const db = require('../base');
const util = require('../../util/util');

const connection = db.connection;



/**
 * 
 * @param {function} callback 
 * @param  {IArguments} args  consist of mainly, error, results, fields
 */
const returnCallback = function (callback, args) {
    let [error, results, fields] = [...args];

    callback(results, error,fields);
};

module.exports.connection = connection;

/**
 * Retrieve all the students 
 * might want to put a limit and page later on
 */
module.exports.getStudents = function (callback) {
    connection.query("select * from students", function (){
        returnCallback(callback, arguments)
    });
};

/**
 * Insert a new student
 */
module.exports.insertStudent = function (data, callback) {
    var now = util.dateToMysqlFormat(new Date());
    connection.query("INSERT INTO students (`username`, `email`, `is_suspended`, `created_at`)" +
        "VALUES (?, ?, ?, ?) ", [data.username, data.email, 0, now], function (){
        returnCallback(callback, arguments)
    });
};

/**
 * Get a single student by id
 */
module.exports.getStudent = function (id, callback) {
    connection.query("select * from students where id = ? ", [id], function (){
        returnCallback(callback, arguments)
    });
};


/**
 * Get student by email address 
 */
module.exports.getStudentsByEmail = function (email, callback) {
    connection.query("select * from students where email = ? ", [email],function (){
        returnCallback(callback, arguments)
    });
};


/**
 * Delete a single student
 */
module.exports.deleteStudents = function (id, callback) {
    connection.query("delete from students where id = ?", [id], function (){
        returnCallback(callback, arguments)
    });
};



/** 
 * Suspend a single student
 */
module.exports.suspendStudent = function (id, callback) {
    connection.query("update students set is_suspended = 1 where id = ?", [id], function (){
        returnCallback(callback, arguments)
    });
};

/** 
 * Un-suspend a single student
 */
module.exports.unSuspendStudent = function (id, callback) {
    connection.query("UPDATE students SET is_suspended = 0 where id = ?" , [id],  function (){
        returnCallback(callback, arguments)
    });
};