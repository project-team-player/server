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
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {

    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    generate,
}