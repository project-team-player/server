require('dotenv').config({ path: __dirname + '../.env' });
const fs = require('fs');

if(process.argv.includes('--team')) {
    // TODO Run Team ingestion
    console.log('Running Ingestion Engine for Teams');
} else {
    console.log('Need further arguments to specify engine to be run');
}