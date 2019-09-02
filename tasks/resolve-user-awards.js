/**
 * This will only be executed after 'resolve-user-bets.js' finished executing.
 * 1. Read all the users in the DB
 * 2. For each user, perform calculations on the formula
 *      pizzaSlicesWeekly = pizzaSlicesWeekly + ((pizzaSlicesWonWeek x 2) x multiplier)
 *      Multiplier will be derived from the multiplier table on the 'data' folder
 *      and will be derived based on the user's 'weeklyWins' field.
 * 3. Update user's 'pizzSlicesWeekly' on the DB
 * Big O(N).
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const userController = require('../controllers/user-controller');

const resolveAwards = async (dbName) => {
    // create DB conn string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    resolveAwards,
};