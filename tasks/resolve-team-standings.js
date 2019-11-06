/**
 * Calls the standings ingestion engine to update the team standings
 * each week. 
 * Each team in the DB has following fields:
 *  -> key
 *  -> wins
 *  -> losses
 *  -> draws
 * Each team pulled from the ingestion engine has corresponding fields:
 *  -> Team
 *  -> Wins
 *  -> Losses
 *  -> Ties
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const teamController = require('../controllers/team-controller');
const teamStandings = require('../ingestion/standing-partition');

const resolveStandings = async (season, dbName) => {
    // create DB conn string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        await mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
        /**
         * 1. call appropriate ingestion engine (standing-partition)
         * 2. for each element in the array, match the team(3rdP) and key(DB) values
         * 3. set wins, losses and draws(DB) via Wins, Losses, Ties(3rdP)
         */
        const teams = await teamStandings.runEngine(season);
        for(let i = 0; i < teams.length; ++i) {
            const filter = { key: teams[i].Team };
            const updates = {
                wins: teams[i].Wins,
                losses: teams[i].Losses,
                draws: teams[i].Ties,
            };
            await teamController.updateOne(filter, updates);
        }
        await mongoose.disconnect();
        const returnObj = {
            message: `${teams.length} teams has had their records updated`,
        };
        return returnObj;

    } catch (err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    resolveStandings,
}
