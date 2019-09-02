/**
 * Assigns the winners of each game in the database with a 
 * 'None' value
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const gameController = require('../controllers/game-controller');

const assignNone = async (dbName) => {
    // create DB string.
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    assignNone,
}