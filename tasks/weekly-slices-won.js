/**
 * Assign a 'pizzaSlicesWonWeek' field to all users.
 * Set it to '0'. 
 * AS of 9/2/19, only test and development DBs have users
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const userController = require('../controllers/user-controller');

const distributeSlices = async (dbName) => {

};

module.exports = {
    distributeSlices,
};