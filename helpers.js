/**
 * File of the data and helper functions that can be exposed in creating templating functions
 * 
 */

 // FS is built in to node and allows to read files from system being run
const fs = require('fs');

// moment.js displays dates 
exports.moment = require('moment');

// Dump is a handy debugging function for the console.log data
exports.dump = (obj) => JSON.stringif(obj, null, 2);

// inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

// Some details about the server
exports.serverName = 'Alla Pecorina';
exports.title = 'Pizza';

exports.menu = [
    // MENU 
];