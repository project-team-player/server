const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const gamethreadController = require('../controllers/gamethread-controller');
const gameController = require('../controllers/game-controller');

const runEngine = async () => {
    try {
        mongoose.connect(process.env.DATABASE_CONNECTION);
        mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
        /**
         * 1. DB Search: Search all the games in the DB and place it in an array
         * 2. Create game thread objects for each game.
         * 3. DB Add: add all the game threads to the 'gamethread' collection.
         */
        const pushToDB = []; // array of game threads
        const games = await gameController.readMany({});
        for(let i = 0; i < games.length; ++i) {
            const gamethread = {
                game: {
                    gameID: games[i]._id.toString(),
                    objectReference: games[i]._id,
                },
                bets: [],
                comments: [],
                week: games[i].week,
            };
        }

        // close db when youre done
        mongoose.disconnect();
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    runEngine,
};