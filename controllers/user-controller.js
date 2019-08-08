const User = require('../models/User');

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

/**
 * 
 * @param {Object} options -> defines the parameters on what to find  
 * @returns Object read
 */
const readOne = async (options) => {
    const returnAwait = await User.findOne(options);
    return returnAwait;
};

module.exports = {
    createOne,
    readOne,
};