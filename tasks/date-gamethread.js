/**
 * Attach dateTime field on the gamethreads. derive it from 
 * their associated games using the slug property. 
 * Big O(N ^ 2)
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const gamethreadController = require('../controllers/gamethread-controller');
const gameController = require('../controllers/game-controller');

const copyDates = async (dbName) => {
    try {
        // create db string connection
        const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
        mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
        const games = await gameController.readMany({});
        for(let i = 0; i < games.length; ++i) {
            const gamethread = await gamethreadController.readOne({
                slug: games[i].slug,
            });
            await gamethreadController.updateOne(gamethread._id, {
                dateTime: games[i].dateTime,
            });
        }
        mongoose.disconnect();
        return;
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    copyDates,
};