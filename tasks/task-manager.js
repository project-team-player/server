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
const NFL_WEEK = 1; // change this accordingly

if(process.argv.includes('--pipe1')) {
    // run pipe 1 subroutines.
    console.log(process.argv[3]);
} else {
    console.log('Task Manager Activated');
}
