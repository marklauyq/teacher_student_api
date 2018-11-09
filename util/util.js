const fs = require('fs');
const validator = require('email-validator');


module.exports.add = (a,b) => a+b;

module.exports.square = (a) => a*a;

module.exports.validEmail = (email) => {
   return validator.validate(email);
};

module.exports.log = function () {
    let date = new Date()
    let app_dir = global.app_dir ? global.app_dir :'./';
    const dir = `${app_dir}/logs/`;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    let name = `${dir}${date.getFullYear()}_${date.getUTCMonth()+1}_${date.getDate()}_server.logs`;

    const timing = date.toJSON();

    const data  = {
        'log_time' : timing,
        'data' : arguments
    };

    const stringData = JSON.stringify(data, undefined, 2)

    console.log(stringData);
    // let just log all request here
    fs.appendFile(name, stringData, (err)=>{
        if(err){
            console.log("Error opening file" , err);
        }
    });
};


/**
 * You first need to create a formatting function to pad numbers to two digits…
 **/
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

/**
 * …and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/
module.exports.dateToMysqlFormat = function(date) {
    return date.getUTCFullYear() + "-" + twoDigits(1 + date.getUTCMonth()) + "-" + twoDigits(date.getUTCDate()) + " " + twoDigits(date.getUTCHours()) + ":" + twoDigits(date.getUTCMinutes()) + ":" + twoDigits(date.getUTCSeconds());
};