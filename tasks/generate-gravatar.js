/**
 * Generate gravatars for all the existing comments. Take it from 
 * the virtual field in the user. 
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const commentController = require('../controllers/comment-controller');

const generate = async (dbName) => {
    // create the DB conn string
    
};

module.exports = {
    generate,
}