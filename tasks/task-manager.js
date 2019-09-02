const weeklySlices = require('./award-weekly-slices');

if(process.argv.includes('--weekly-slices')) {
    weeklySlices.distributeSlices(process.argv[3]);
} else {
    console.log('Task Manager Activated');
}

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