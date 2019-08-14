const Team = require('../models/Team');

/**
 * 
 * @param {Object} team -> team to be added
 * @param {Object} options -> optional parameters
 * @returns {Object} created Object
 */
const createOne = async(team, options) => {
    const returnAwait = await Team.create(team);
    return returnAwait;
};

/**
 * 
 * @param {Object} teams -> teams to be added
 * @param {Object} options -> optional parameters
 * @returns {Object} created Objects
 */
const createMany = async(teams, options) => {
    const returnAwait = await Team.insertMany(teams, { ordered: false });
    return returnAwait;
};

/**
 * 
 * @param {Object} options -> defines parameters to find
 */
const readOne = async(options) => {
    const returnAwait = await Team.findOne(options);
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