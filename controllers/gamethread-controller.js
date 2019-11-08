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
    const returnAwait = await Gamethread.findOne(options).populate('comments', 'replies text createdAt owner votes').populate({ 
        path: 'bets',
        select: 'slicesBet key',
        populate: [
            { path: 'owner', select: 'name' },
        ]
    })
    // const returnAwait = await Gamethread.findOne(options).aggregate([
    //     { "$unwind": "$reviews" }, 
    //     { $lookup: { from: 'Bets' } }
    // ])
    return returnAwait;
};

/**
 * 
 * @param {Object} options -> the conditions on what to find
 * @returns {Object} read Object 
 */
const readMany = async(options) => {
    const returnAwait = await Gamethread.find(options);
    return returnAwait;
};

/**
 * 
 * @param {Object} gamethread -> gamethread id to be updated 
 * @param {Object} options -> update parameters
 * @returns {Object} 
 */
const updateOne = async(gamethread, options) => {
    const returnAwait = await Gamethread.findByIdAndUpdate(gamethread, { $set: options }, { new: true });
    return returnAwait;
};

module.exports = {
    createOne,
    createMany,
    readOne,
    readMany,
    updateOne,
};