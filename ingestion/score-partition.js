/**
 * This function pulls the scores from the game by season. 
 */
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

const runEngine = async (season, week) => {
    try {   
        const data = await axios.get(`${process.env.SPORTSDATAIO_BASE_URL}ScoresByWeek/${season}/${week}?key=${process.env.SPORTSDATAIO_API_KEY}`);
        return data.data;
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    runEngine,
};