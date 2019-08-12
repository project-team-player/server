const Gamethread = require('../models/Gamethread');

/**
 * 
 * @param {Object} gamethread -> to be added in the DB
 * @param {Object} options -> optional parameters
 * @returns created Object 
 */
const createOne = async(gamethread, options) => {
    const returnAwait = await Gamethread.create(gamethread);
    return returnAwait;
};

/**
 * 
 * @param {Object} gamethreads -> threads to be added in the DB 
 * @param {Object} options -> optional paramters
 * @returns {Object} created Objects. 
 */
const createMany = async(gamethreads, options) => {
    const returnAwait = await Gamethread.insertMany(gamethreads, { ordered: false });
    return returnAwait;
};

/**
 * 
 * @param {Object} options -> the conditions on what to find
 * @returns {Object} read Object 
 */
const readOne = async(options) => {
    const returnAwait = await Gamethread.findOne(options);
    return returnAwait;
};

/**
 * 
 * @param {Object} options -> the conditions on what to find
 * @returns {Object} read Object
 * NOTE: this is probably the most useful controller when finding
 * for all the games in a given week since 'week' is already a 
 * key in the Gamethread model. 
 */
const readMany = async(options) => {
    const returnAwait = await Gamethread.find(options);
    return returnAwait;
};

module.exports = {
    createOne,
    createMany,
    readOne,
    readMany,
};