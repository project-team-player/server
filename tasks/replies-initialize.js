/**
 * Gives all comments in the database a replies array.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const commentController = require('../controllers/comment-controller');

const intializeReplies = async (dbName) => {

};

module.exports = {
    initializeReplies,
};