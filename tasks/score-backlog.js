/**
 * Backlog of scores. 
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const scores = require('../ingestion/score-write-partition');
const Game = require('../models/Game');
const dateArray = require('../data/game-dates');

const writeScores = async (date, dbName, year, week) => {
    // create DB string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        const gameScores = await scores.runEngine(date);
        /**
          * 1. Build slug from params and gameScores info
          * 2. Find the corresponding game in the DB based of slug
          * 3. Rewrite scores
          * 4. Save to DB.
          */
        await mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
        for (let i = 0; i < gameScores.length; ++i) {
            // WARNING: Washington Redskins uses 'WAS' as key in the DB but arrives as 'WSH' from a 3rd party API, check this shit.
            // EXPECT MORE OF THIS SHIT
            let teamAway;
            let teamHome;
            if(gameScores[i].team_away === 'WSH') {
                teamAway = 'WAS';
                teamHome = gameScores[i].team_home;
            } else if(gameScores[i].team_home === 'WSH') {
                teamAway = gameScores[i].team_away;
                teamHome = 'WAS';
            } else {
                teamAway = gameScores[i].team_away;
                teamHome = gameScores[i].team_home;
            }
            const slug = `${teamAway}-vs-${teamHome}-${year}-week-${week}`;
            const filter = { slug: slug };
            const updates = {
                awayScore: gameScores[i].score.score_away,
                homeScore: gameScores[i].score.score_home,
            };
            await Game.findOneAndUpdate(filter, updates);
        }
        await mongoose.disconnect();
        const returnObj = {
            message: `${gameScores.length} games have their scores updated`,
        }
        return returnObj;
    } catch (err) {
        console.log(`Error has occured ${err}`);
    }
};

const machinate = async () => {
    /** change these variables accordingly *************************************/
    const dbName = 'development'; 
    const year = '2019';
    const dates = dateArray.dates1
    /***************************************************************************/
    try {
        for (let i = 0; i < dates.length; ++i) {
            await writeScores(dates[i][0], dbName, year, dates[i][1]);
        };
    } catch (err) {
        console.log(`Error has occured ${err}`);
    }
};

machinate();
