const mysql = require('mysql');
const util = require('util');

//todo: Change this to env variables
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mmarrk',
    database : 'govtech'
});


var status = true;
connection.connect((err) => {
    if (err) {
        status = false;
        util.log('error connecting: ' + err.stack);
        return;
      }
    
      util.log('connected as id ' + connection.threadId);
});


module.exports.connection = connection;
module.exports.status = status;