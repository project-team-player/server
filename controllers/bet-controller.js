const Bet = require('../models/Bet');

/**
 * 
 * @param {Object} bet -> the bet object 
 * @param {Object} options -> optional parameters
 * @returns {Object} created object
 */
const createOne = async(bet, options) => {
    const returnAwait = await Bet.create(bet);
    return returnAwait;
};

/**
 * 
 * @param {Array of Objects} bets -> bets to be inserted 
 * @param {Object} options -> optional parameters
 * @returns {Object} returned object
 */
const createMany = async(bets, options) => {
    const returnAwait = await Bet.insertMany(bets, { ordered: false });
    return returnAwait;
};

/**
 * 
 * @param {Object} options -> defines parameters to find
 * @returns {Object} -> found object
 */
const readOne = async(options) => {
    const returnAwait = await Bet.findOne(options);
    return returnAwait;
};

/**
 * 
 * @param {Options} options -> defines parameters to find
 * @returns {Options} -> found objects
 */
const readMany = async(options) => {
    const returnAwait = await Bet.find(options);
    return returnAwait;
};

/**
 * 
 * @param {Object} bet -> the bet object
 * Synchronizes user and gamethreads on the database 
 * accordingly for every bet.
 */
const syncUserAndGamethread = async(bet) => {

}

module.exports = {
    createOne,
    createMany,
    readOne,
    readMany,
};