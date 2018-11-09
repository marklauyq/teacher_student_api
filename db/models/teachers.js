var connection = require('../base');



/**
 * 
 * @param {function} callback 
 * @param  {Array} args  consist of mainly, error, results, fields
 */
var returnCallback = function (callback, args) {
    [error, results, fields] = [...args];

    if(error) throw error;
    callback(results,fields);
}


/**
 * 
 * @param {function} callback 
 */
const getTeachers = function(callback){
    connection.query("select * from teachers", function (){
        returnCallback(callback, arguments)
    });
}

/**
 * 
 * @param {object} data Contains all the details to be inserted
 * @param {function} callback callback function to retrieve results
 */
const insertTeacher = function(data, callback){
    var now = connection.escape(new Date());
    connection.query("INSERT INTO students (`username`, `email, `created_at`)" +
        "VALUES (?, ?, ?, ?) ", [data.username, data.email, now], function (){
        returnCallback(callback, arguments)
    });
}

module.exports.getTeachers = function (callback){
    connection.query("select * from teachers", (error, results, fields) => {
        callback(error, results, fields)
     });
}



module.exports.insertTeacher = function(callback){

}


module.exports.getTeachers = function(callback){}

module.exports.deleteTeachers = function(callback){}

