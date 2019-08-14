const Game = require('../models/Game');

/**
 * 
 * @param {Object} game -> game to be added
 * @param {Object} options -> optional parameters
 * @returns {Object} returned Object
 */
const createOne = async(game, options) => {
    const returnAwait = await Game.create(game);
    return returnAwait;
};

/**
 * 
 * @param {Object} games -> games to be added 
 * @param {Object} options -> optional parameters
 * @returns {Object} returned Object
 */
const createMany = async(games, options) => {
    const returnAwait = await Game.insertMany(games, { ordered: false });
    return returnAwait;
};

/**
 * 
 * @param {Object} options -> defines parameters to find 
 * @returns {Object} returned found object
 */
const readOne = async(options) => {
    const returnAwait = await Game.findOne(options);
    return returnAwait;
};

const readMany = async(options) => {
    // TODO
};

module.exports = {
    createOne,
    createMany,
    readOne,
    readMany,
};