/**
 * Resolves the game scores with a given season and week.
 * Calls the score-partition ingestion engine.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const scores = require('../ingestion/score-partition');
const gameController = require('../controllers/game-controller');

const resolveScores = async (season, week) => {
    try {
        const gameScores = await scores.runEngine(season, week);
        /**
         * gameScores are now populated with data as an array of game objects
         * 1. Pull all game objects from the database by { week }.
         * 2. Match gameScores with the pulled games by { gameKey } (preferably), { globalGameID } (alternative).
         * 3. Update all the game objects to reflect winner.
         * NOTE: gameScores has 'GameKey'. weekGames has 'gameKey'.
         */
        // TODO: make db connection string modular. See './default-winner.js'
        mongoose.connect(process.env.DATABASE_CONNECTION);
        mongoose.Promise = global.Promise;
        let resolvedScores = 0;
        const weekGames = await gameController.readMany({ week });
        for(let i = 0; i < weekGames.length; ++i) {
            for(let j = 0; j < gameScores.length; ++j) {
                if(weekGames[i].gameKey === gameScores[j].GameKey) {
                    // then decide winner
                    let winner = '';
                    if(gameScores[j].AwayScore > gameScores[j].HomeScore) {
                        winner = gameScores[j].AwayTeam;
                    } else if(gameScores[j].AwayScore < gameScores[j].HomeScore) {
                        winner = gameScores[j].HomeTeam;
                    } else {
                        winner = 'TIE';
                    }
                    // reflect winner into weekGame obj
                    await gameController.updateOne(weekGames[i]._id, { winner });
                    resolvedScores++;
                }
                // else just interate through the loop
            }
        }
        mongoose.disconnect();
        const returnObj = {
            scores: gameScores.length,
            resolved: resolvedScores,
            message: `${resolvedScores} out of the ${gameScores.length} games had their scores resolved.`,
        };
        return returnObj;
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

// write script here for it to be callable
// ITS called the 'bitch dont run my scripts' lock

module.exports = {
    resolveScores,
};


