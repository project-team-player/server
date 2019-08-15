const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const gamethreadController = require('../controllers/gamethread-controller');
const gameController = require('../controllers/game-controller');

const runEngine = async () => {
    try {
        /**
         * 1. DB Search: Search all the games in the DB and place it in an array
         * 2. Create game thread objects for each game.
         * 3. DB Add: add all the game threads to the 'gamethread' collection.
         */
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    runEngine,
};