/**
 * O(n^2) 
 */
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
            pushToDB.push(gamethread);
        }
        await gamethreadController.createMany(pushToDB);
        /**
         * gamethreads are now pushed into the database
         * ObjectIds now exist for gamethread objects
         * reverse referencing it to each game is now possible
         * 1. DB Search: Search all game threads in the DB and place it in an array
         * 2. Update each game's gamethread reference with its corresponding 
         * gamethread's id.
         * 3. Done
         */
        const gamethreads = await gamethreadController.readMany({});
        for(let i = 0; i < gamethreads.length; ++i) {
            for(let j = 0; j < games.length; ++j) {
                if(gamethreads[i].game.gameID === games[j]._id.toString()) {
                    await gameController.updateOne(games[j]._id, {
                        gameThreadReference: {
                            gameThreadID: gamethreads[i]._id.toString(),
                            objectReference: gamethreads[i]._id
                        }
                    });
                }
            }
        }
        // Done
        // close db when youre done
        mongoose.disconnect();
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    runEngine,
};