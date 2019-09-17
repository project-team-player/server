/**
 * Gives all comments in the database a replies array.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const commentController = require('../controllers/comment-controller');

const initializeReplies = async (dbName) => {
    try {
        
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }

};

module.exports = {
    initializeReplies,
};