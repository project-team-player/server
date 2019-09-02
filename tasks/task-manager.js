const weeklySlices = require('./award-weekly-slices');

if(process.argv.includes('--weekly-slices')) {
    weeklySlices.distributeSlices(process.argv[3]);
} else {
    console.log('Task Manager Activated');
}

/**
 * If a task pipeline is to be created, this will be the order
 * 1. resolve-game-scores
 * 2. resolve-bets
 * 3. resolve-user-bets
 * 4. resolve-user-awards
 * 5. resolve-weekly-resets
 */