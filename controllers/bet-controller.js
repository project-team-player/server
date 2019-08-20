const Bet = require('../models/Bet');
const userController = require('./user-controller');
const gamethreadController = require('./gamethread-controller');

/**
 * 
 * @param {Object} bet -> the bet object 
 * @param {Object} options -> optional parameters
 * @returns {Object} created object or error message
 */
const createOne = async(bet, options) => {
    const returnAwait = await Bet.create(bet);  
    const fromSync = await syncUserAndGamethread(returnAwait._id, returnAwait.slicesBet);
    return fromSync;
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
const syncUserAndGamethread = async(bet, slices) => {
    const betObj = await Bet
        .findOne({ _id: bet })
        .populate('owner.objectReference')
        .populate('gameThreadReference');
    const user = betObj.owner.objectReference;
    const gamethread = betObj.gameThreadReference;
    betsArrayUser = user.bets;
    betsArrayGamethread = gamethread.bets;
    betsArrayUser.push(bet);
    betsArrayGamethread.push(bet);
    const userUpdate = await userController.updateOne(user._id.toString(), {
        bets: betsArrayUser,
    });
    const gamethreadUpdate = await gamethreadController.updateOne(gamethread._id.toString(), {
        bets: betsArrayGamethread,
    });
    if(userUpdate && gamethreadUpdate) {
        const returnedObj = {
            message: 'Success betting', 
        };
        return returnedObj;
    } else {
        const returnedObj = {
            message: 'Fail to update user and/or gamethread',
        }
        return returnedObj;
    }
}

module.exports = {
    createOne,
    createMany,
    readOne,
    readMany,
};