/**
 * This file is used to load all routes that is located inside this folder.
 * All JS files will be loaded.
 */
const path = require('path');
const util = require('util');
const normalizedPath = path.join(__dirname);


module.exports = (app) => {
    require("fs").readdirSync(normalizedPath).forEach(function (file) {
        if(file === 'base.js'){
            const filename = `${__dirname}/${file}`;
            const fileWithoutExt = file.split('.').slice(0, -1).join('.');

            if (fileWithoutExt.endsWith('.test')) // do not load test files
                return;

            util.log("Loading Route", filename, fileWithoutExt); 

            var route = require(filename); // load the files
            app.use(`/api/`, route);   // add the routes in 
        }else if (file !== path.basename(__filename)) {
            const filename = `${__dirname}/${file}`;
            const fileWithoutExt = file.split('.').slice(0, -1).join('.');

            if (fileWithoutExt.endsWith('.test')) // do not load test files
                return;

            util.log("Loading Route", filename, fileWithoutExt); 

            var route = require(filename); // load the files
            app.use(`/api/${fileWithoutExt}`, route);   // add the routes in 
        }
    });
};