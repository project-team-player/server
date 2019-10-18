/**
 * Calls the program in ../ingestion/score-write-partition.js.
 * Options on how to match score with a game:
 * 1. Obtain home and away teams (awayTeam.key and homeTeam.key) 
 *  -> match with data.data.events[i].teams_normalized[0].abbreviation (away)
 *      and data.data.events[i].teams_normalized[1].abbreviation (home)
 * WARNING: Washington Redskins uses 'WAS' as key in the DB but arrives as 'WSH' from a 3rd party API, check this shit.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const scores = require('../ingestion/score-write-partition');
const Game = require('../models/Game');

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
            const slug = `${gameScores[i].team_away}-vs-${gameScores[i].team_home}-${year}-week-${week}`;
            const filter = { slug: slug };
            const updates = {
                awayScore: gameScores[i].score.score_away,
                homeScore: gameScores[i].score.score_home,
            };
            const updated = await Game.findOneAndUpdate(filter, updates);
            console.log(updated);
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

writeScores(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);