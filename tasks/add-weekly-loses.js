/**
 * Adds zero to weekly loses fields in all users
 * as of 9/2/19, development and test DBs are the only
 * DBs with users
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const userController = require('../controllers/user-controller');

const addWeeklyLoses = async (dbName) => {
    // create DB conn string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
        const result = await userController.updateMany({
            weeklyLoses: 0,
        });
        mongoose.disconnect();
        return result;
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

// write script here for it to be callable
// ITS called the 'bitch dont run my scripts' lock

module.exports = {
    addWeeklyLoses,
};