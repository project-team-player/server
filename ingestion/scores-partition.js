/**
 * This function pulls the scores from the game by season. 
 */
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');

const runEngine = async () => {
    // TODO
};

module.exports = {
    runEngine,
}