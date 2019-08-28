const User = require('../models/User');
const betController = require('./bet-controller');

/**
 * 
 * @param {Object} user -> The user to be added
 * @param {Object} options -> optional parameters
 * @returns Object created
 */
const createOne = async (user, options) => {
    const returnAwait = await User.create(user);
    return returnAwait;
}

const createMany = async (users, options) => {
    const returnAwait = await User.insertMany(users, { ordered: false });
    return returnAwait;
}

/**
 * 
 * @param {Object} options -> defines the parameters on what to find  
 * @returns Object read
 */
const readOne = async (options) => {
    const returnAwait = await User.findOne(options);
    return returnAwait;
};

/**
 * 
 * @param {Object} options -> defines parameters to find
 * @returns {Object} found Object(s)
 */
const readMany = async (options) => {
    const returnAwait = await User.find(options);
    return returnAwait;
};

/**
 * 
 * @param {ObjectID} -> id of the user that will use this controller
 * @param {Object} options -> optional parameters
 * @returns {Array} of Bet objects 
 */
const readAllBets = async (user, options) => {
    const foundUser = await User.findOne({ _id: user });
    // perform if user's bets array isnt empty
    if(foundUser.bets.length !== 0) {
        const returnArray = [];
        for(let i = 0; i < foundUser.bets.length; ++i) {
            const bet = await betController.readOne({ _id: foundUser.bets[i] });
            returnArray.push(bet);
        }
        return returnArray;
    }
    // else bet array is empty return error message
    const returnedMsg = {
        serverMessage: `${foundUser.username} has not placed any bets`,
    };
    return returnedMsg;   
};

/**
 * 
 * @param {Object} user -> user id 
 * @param {Object} options -> update parameters
 * @returns {Object}
 */
const updateOne = async (user, options) => {
    const returnAwait = await User.findByIdAndUpdate(user, { $set: options }, { new: true });
    return returnAwait;
};

/**
 * 
 * @param {Object} options -> Defines parameters to update.
 * @returns {Object} returnedObj -> an object with message.
 */
const updateMany = async (options) => {
    const users = await User.updateMany({}, { $set: options }, { new: true });
    const returnObj = {
        serverMessage: `${users.length} items updated with updateMany`,
    };
    return returnObj;
};

module.exports = {
    createOne,
    createMany,
    readOne,
    readMany,
    readAllBets,   
    updateOne,
    updateMany,
};