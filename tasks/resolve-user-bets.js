/**
 * Each user who has betted on the week will have their bet array 
 * populated. 
 * 1. Get all users in the DB
 * 2. read all their bets in their bets array 
 * 3. for each bet, look at the 'isWin' field
 * 4. IF 'isWin' is true, increment user's 'weeklyWins' AND add 
 *  'slicesBet' on the bet into the user's 'pizzaSlicesWonWeek' field
 * 5. ELSE 'isWin is false, do nothing.
 * NOTE: must only run after 'resolve-bets.js' has been run.
 * Computationally expensive. All users are in an array, each of them 
 * has an array of bets. O(n ^ 2). 
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const betController = require('../controllers/bet-controller');
const userController = require('../controllers/user-controller');

const resolveBets = async (dbName) => {
    // create DB conn string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
        // 1
        const users = await userController.readMany({});
        for(let i = 0; i < users.length; ++i) {
            // 2
            for(let j = 0; j < users[i].bets.length; ++j) {
                // 3
                if(users[i].bets[j].isWin === true) {
                    // TODO
                }
            }
        }

    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    resolveBets,
};