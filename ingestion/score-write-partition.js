/**
 * Score Write -> Writes the scores in a given game.
 * Different 3rd party API. Actual scores are written.
 * Limited to 25 calls per day. 
 * This then gets called by a task program in the task folder.
 * Namely ../tasks/write-actual-scores.js
 */
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

const runEngine = async (date) => {
    try {
        // TODO
    } catch (err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    runEngine,
};