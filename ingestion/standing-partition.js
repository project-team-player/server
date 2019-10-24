/**
 * Pulls the standings from the 3rd-party API. Yes i know it could be calculated.
 * But who has time for stuff like that.
 * This function will most likely be inserted into the pipe1 flow.
 */
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

const runEngine = async (season) => {
    try {
        const data = await axios.get(`${process.env.SPORTSDATAIO_BASE_URL}Standings/${season}?key=${process.env.SPORTSDATAIO_API_KEY}`);
        return data.data;
    } catch (err) {
        console.log(`Error has occured ${err}`);
    }
};

runEngine(process.argv[2]).then(data => console.log(data));

module.exports = {
    runEngine,
};