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

/**
 * 
 * @param {Object} filter -> filter of the game to be updated 
 * @param {Object} options -> keys to be updated with respective values
 * @returns {Object} updated Object
 */
const updateOne = async(filter, options) => {
    const returnAwait = await Game.findOneAndUpdate(filter, { $set: options }, { new: true });
    return returnAwait;
};

/**
 * 
 * @param {Object} options -> defines the keys/fields that needed to be updated.
 * @returns {JSON} message
 */
const updateMany = async (options) => {
    const returnAwait = await Game.updateMany({}, { $set: options }, { new: true });
    const returnObj = {
        serverMessage: `${returnAwait.length} items updated with updateMany`,
    };
    return returnObj;
};

module.exports = {
    createOne,
    createMany,
    readOne,
    readMany,
    updateOne,
    updateMany,
};