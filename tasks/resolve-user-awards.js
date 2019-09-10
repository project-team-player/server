/**
 * This will only be executed after 'resolve-user-bets.js' finished executing.
 * 1. Read all the users in the DB
 * 2. For each user, perform calculations on the formula
 *      pizzaSlicesWeekly = pizzaSlicesWeekly + ((pizzaSlicesWonWeek x 2) x multiplier)
 *      Multiplier will be derived from the multiplier table on the 'data' folder
 *      and will be derived based on the user's 'weeklyWins' field.
 * 3. Update user's 'pizzSlicesWeekly' on the DB
 * Big O(N).
 * After execution of this program, the 'pizzaSlicesWeekly' field of all users
 * should be updated to reflect the rewards they reaped from winning games. 
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const userController = require('../controllers/user-controller');
const multiplier = require('../data/multiplier');

const resolveAwards = async (dbName) => {
    const WON_BET_MULTIPLIER = 2;
    // create DB conn string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        await mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
        // 1
        const users = await userController.readMany({});
        // 2
        for(let i = 0; i < users.length; ++i) {
            let pizzaSlicesWeekly = users[i].pizzaSlicesWeekly;
            const pizzaSlicesWonWeek = users[i].pizzaSlicesWonWeek;
            const weeklyWins = users[i].weeklyWins;
            // calculate the shit out of it. 
            pizzaSlicesWeekly = pizzaSlicesWeekly + ((pizzaSlicesWonWeek * WON_BET_MULTIPLIER) * multiplier[weeklyWins]);
            // 3
            await userController.updateOne(users[i]._id, {
                pizzaSlicesWeekly,
            });
        }
        await mongoose.disconnect();
        const returnObj = {
            message: `${users.length} users have their awards resolved`,
        };
        return returnObj;

    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

// write script here for it to be callable
// ITS called the 'bitch dont run my scripts' lock

module.exports = {
    resolveAwards,
};