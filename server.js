const express = require('express');
var bodyParser = require('body-parser');
const util = require('./util/util.js');

var app = new express();
global.app_dir = __dirname;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//middlewares
/**
 * I want to be able to log every incoming request
 */
app.use((req, res, next)=>{
    util.log("Logging request" , {
        "method" :req.method, 
        "path":req.path, 
        "headers":req.headers, 
        "params":req.params, 
        "body":req.body
    });
    next();
});


/**
 * I want to be able to log every outgoing response
 */
app.use((req, res , next)=>{
    var oldSend = res.send;
    
    res.send = function(data){
        util.log("Loggin Response data" ,data); 
        oldSend.apply(res, arguments);
    }

    next();
});

app.get('/', (req, res) => {
    res.send("Welcome to Mark's API");
});

require('./routes/routes')(app);



const server = app.listen(3000, ()=> {
    util.log("Starting server");
});

module.exports = server;