/**
 * Pulls the standings from the 3rd-party API. Yes i know it could be calculated.
 * But who has time for stuff like that.
 * This function will most likely be inserted into the pipe1 flow.
 */
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });