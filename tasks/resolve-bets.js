const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const betController = require('../controllers/bet-controller');
const gameController = require('../controllers/game-controller');

/**
 * The bet resolver for every user. 
 * One game can have many bets associated with it. One to many relationships
 * 1. Obtain all the games within a week in the database
 *      -> For each game, find the associated bets (use SLUG), pull the winner. 
 *      -> For each bet, perform following:
 *          -> IF the winner on the game is the same as the 'key' in the bet, bet wins.
 *          -> ELSE bet loses. 
 *          -> update that bet object's 'isWin' key
 * NOTE: This MUST only run after 'resolve-game-scores.js' has been run. 
 * @returns {Object} with messages
 */
const resolveBets = async (week, dbName) => {
    // create DB string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
        let resolvedBets = 0;
        const games = await gameController.readMany({ week });
        for(let i = 0; i < games.length; ++i) {
            const bets = await betController.readMany({ slug: games[i].slug });
            // The bets with the same slug as the game is now obtained, 
            // that model planning was on point bitches.
            for(let j = 0; j < bets.length; ++j) {
                // each bet now penetrated. Um penetrate. yum.
                let isWin;
                if(bets[j].key === games[i].winner) {
                    // bet wins
                    isWin = true;
                } else {
                    // big fat 'L'
                    isWin = false;
                }
                // update the bet object with its isWin key
                await betController.updateOne(bets[j]._id, { isWin });
                resolvedBets++;
            }
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

// write script here for it to be callable
// ITS called the 'bitch dont run my scripts' lock

module.exports = {
    resolveBets,
};