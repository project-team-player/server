/**
 * Gives all comments in the database a replies array.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const commentController = require('../controllers/comment-controller');
const Comment = require('../models/Comment');

const initializeReplies = async (dbName) => {
    // create a DB connection string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
        const comments = await commentController.readMany({});
        for(let i = 0; i < comments.length; i++) {
            await Comment.findByIdAndUpdate(comments[i]._id, {
                $set: {
                    replies: [],
                }
            });
        }
        mongoose.disconnect();
        return;
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }

};

module.exports = {
    initializeReplies,
};