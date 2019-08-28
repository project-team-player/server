const weeklySlices = require('./award-weekly-slices');

if(process.argv.includes('--weekly-slices')) {
    weeklySlices.distributeSlices(process.argv[3]);
} else {
    console.log('Task Manager Activated');
}