/**
 * Generate gravatars for all the existing comments. Take it from 
 * the virtual field in the user. 
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const commentController = require('../controllers/comment-controller');
const userController = require('../controllers/user-controller');

const generate = async (dbName) => {
    // create the DB conn string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
        const comments = await commentController.readMany({});
        for(let i = 0; i < comments.length; ++i) {
            const user = await userController.readMany({ username: comments[i].owner });
            // hit user[0] for actual user.
            await commentController.updateOne(comments[i]._id, {
                gravatar: user[0].gravatar,
            });
        }
        mongoose.disconnect();
        return;
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

// insert script in here. 'anti bitch lock'.

module.exports = {
    generate,
}