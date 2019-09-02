/**
 * This is resolver is only to be executed after 'resolve-user-awards.js' has finished
 * executing. Currently, this is the last resolver in the execution chain. 
 * This accomplishes weekly resets. And by weekly, it is defined as the end 
 * of an NFL week which is Monday night after the last MOnday night game.
 * But this will probably run when we get back to the office on Tuesday morning.
 * Fields that need to be reset weekly
 * ------------------------------------------------------------------------------
 * User
 * -> 'bets' into 'accumulatedBets' then empty 'bets'
 * -> 'pizzaSlicesWeekly' into 'pizzaSlicesTotal' then reset 
 *    'pizzaSlicesWeekly' into 64
 * -> 'weeklyWins' into 'wins' then reset 'weeklyWins' to 0
 * -> 'weeklyLoses' into 'loses' then reset 'weeklyLoses' to 0.
 * ------------------------------------------------------------------------------
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const userController = require('../controllers/user-controller');

const weeklyResets = async (dbName) => {
    // create DB conn string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {

    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    weeklyResets,
};