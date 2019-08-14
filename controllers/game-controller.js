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

/**
 * 
 * @param {Object} options -> defines parameters to find
 * @returns {Object} returned Object(s)
 * NOTE: This is probably the most useful controller when finding
 * all the games in a given week since 'week' is already a 
 * key in the Game model. 
 */
const readMany = async(options) => {
    const returnAwait = await Game.find(options);
    return returnAwait;
};

module.exports = {
    createOne,
    createMany,
    readOne,
    readMany,
};