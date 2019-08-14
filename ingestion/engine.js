const teamPartition = require('./team-partition');

if(process.argv.includes('--team')) {
    console.log('Running Ingestion Engine for Teams');
    teamPartition.runEngine();
} else if(process.argv.includes('--game')) {
    console.log('Running Ingestion Engine for Games');
} else {
    console.log('Ingestion Engine Activated');
}