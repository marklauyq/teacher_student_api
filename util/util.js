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