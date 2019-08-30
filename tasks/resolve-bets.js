const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const betController = require('../controllers/bet-controller');
const gameController = require('../controllers/game-controller');

/**
 * The bet resolver for every user. 
 * 1. Obtain all the games in the database
 *      -> For each game, find the associated bet (use SLUG), pull the winner. 
 *      -> IF the winner is the same as in the bet, user wins that bet.
 *      -> ELSE user loses the bet. 
 *      -> update that bet object's 'isWin' key
 * @returns {Object} with messages
 */
const resolveBets = async (week) => {
    try {
        mongoose.connect(process.env.DATABASE_CONNECTION);
        mongoose.Promise = global.Promise;
        let resolvedBets = 0;
        const games = await gameController.readMany({ week });
        for(let i = 0; i < games.length; ++i) {
            const bet = await betController.readOne({ slug: games[i].slug });
            // bet with the same slug as game is now obtained, 
            // that model planning was on point
            let isWin;
            if(bet.key === games[i].winner) {
                // the bet wins 
                isWin = true;
            } else {
                // the bet loses
                isWin = false;
            }
            // update the bet object with its isWin key
            await betController.updateOne(bet._id, { isWin });
            resolvedBets++;
        }
        // breaking out this for loop means all bets associated with week's games
        // have been updated and resolved. 

        // disconnect DB connection
        mongoose.disconnect();
        const returnObj = {
            games: games.length,
            resolved: resolvedBets,
            message: `${resolvedBets} bets have been resolved in ${games.length} games.`,
        };
        return returnObj;
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};  

module.exports = {
    resolveBets,
};