/**
 * If a task pipeline is to be created, this will be the order
 * 1. resolve-game-scores 
 *      -> subroutine: resolveScores(season, week, dbName) 
 *      -> dependencies: ingestion/score-partition
 * 2. resolve-bets
 *      -> subroutine: resolveBets(week, dbName)
 * 3. resolve-user-bets
 *      -> subroutine: resolveBets(dbName)
 * 4. resolve-user-awards
 *      -> subroutine: resolveAwards(dbName)
 *      -> dependencies: data/multiplier
 * 5. resolve-weekly-resets
 *      -> subroutine: resolveResets(dbName)
 */
const resolveGameScores = require('./resolve-game-scores');
const resolveBets = require('./resolve-bets');
const resolveUserBets = require('./resolve-user-bets');
const resolveUserAwards = require('./resolve-user-awards');
const resolveWeeklyResets = require('./resolve-weekly-resets')

const NFL_SEASON = '2019REG'; // change for different years and season types
const NFL_WEEK = 6; // change this accordingly

const pipelines = async (season, week, dbName) => {
    if(process.argv.includes('--pipe1')) {
        // run pipe 1 subroutines.
        const fromGameScores = await resolveGameScores.resolveScores(season, week, dbName);
        const fromBets = await resolveBets.resolveBets(week, dbName);
        const fromUserBets = await resolveUserBets.resolveBets(week, dbName);
        const fromUserAwards = await resolveUserAwards.resolveAwards(dbName);
        const fromWeeklyResets = await resolveWeeklyResets.resolveResets(week, dbName);
        const returnObj = {
            fromGameScores,
            fromBets,
            fromUserBets,
            fromUserAwards,
            fromWeeklyResets,
        };
        console.log(returnObj); // just returns a message.
    } else {
        console.log('Task Manager Activated');
    }
};

pipelines(NFL_SEASON, NFL_WEEK, process.argv[3]);

