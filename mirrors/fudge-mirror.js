const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const userController = require('../controllers/user-controller');
const gameController = require('../controllers/game-controller');
const gamethreadController = require('../controllers/gamethread-controller');
const betController = require('../controllers/bet-controller');

const runMirror = (async) => {

};

module.exports = {
    runMirror,
};