/**
 * Each user who has betted on the week will have their bet array 
 * populated. 
 * 1. Get all users in the DB
 * 2. read all their bets in their bets array 
 * 3. for each bet, look at the 'isWin' field
 * 4. IF 'isWin' is true, increment user's 'weeklyWins' AND add 
 *  'slicesBet' on the bet into the user's 'pizzaSlicesWonWeek' field
 * 5. ELSE 'isWin is false, do nothing.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const betController = require('../controllers/bet-controller');
const userController = require('../controllers/user-controller');

const resolveBets = async (dbName) => {
    
};

module.exports = {
    resolveBets,
};