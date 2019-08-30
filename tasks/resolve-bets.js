const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const betController = require('../controllers/bet-controller');

/**
 * The bet resolver for every user. 
 * 1. Obtain all the bets in the database
 *      -> For each bet, check game reference (use SLUG), pull the winner. 
 *      -> IF the winner is the same as in the bet, user wins that bet.
 *      -> ELSE user loses the bet. 
 *      -> update that bet object's 'isWin' key
 * @returns {Object} with messages
 */
const resolveBets = async => {
    try {
        mongoose.connect(process.env.DATABASE_CONNECTION);
        mongoose.Promise = global.Promise;
        const bets = await betController.readMany({});

        // disconnect DB connection
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};  

module.exports = {
    resolveBets,
};