const teamPartition = require('./team-partition');

if(process.argv.includes('--team')) {
    console.log('Running Ingestion Engine for Teams');
    teamPartition.runEngine();
} else {
    console.log('Need further arguments to specify engine to be run');
}