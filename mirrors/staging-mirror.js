const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const teamController = require('../controllers/team-controller');
const gameController = require('../controllers/game-controller');
const gamethreadController = require('../controllers/gamethread-controller');

const runMirror = async () => {
    try {
        /**
         * 1. connect to the DB to be copied
         * 2. copy data, store on variable
         * 3. disconnect the DB to be copied
         * 4. connect to the DB that copies
         * 5. save data
         * 6. disconnect the DB that copies
         */
        const copyFromDB = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${process.env.DB_DEVELOPMENT}${process.env.DB_CONN_STR4}`;
        const copyToDB = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${process.env.DB_STAGING}${process.env.DB_CONN_STR4}`;
        await mongoose.connect(copyFromDB); // step 1
        mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
        const allTeams = await teamController.readMany({});
        const allGames = await gameController.readMany({});
        const allGamethreads = await gamethreadController.readMany({}); // step 2
        await mongoose.disconnect(); // step 3
        await mongoose.connect(copyToDB); // step 4
        await teamController.createMany(allTeams);
        await gameController.createMany(allGames);
        await gamethreadController.createMany(allGamethreads); // step 5
        await mongoose.disconnect(); // step 6
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    runMirror,
}