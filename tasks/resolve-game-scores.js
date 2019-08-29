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
         */
        
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
}

module.exports = {
    resolveScores,
};


