const Comment = require('../models/Comment');

/**
 * 
 * @param {Object} comment -> comment to be created
 * @param {Object} options -> optional parameters
 * @returns {Object} created object
 */
const createOne = async(comment, options) => {
    const returnAwait = await Comment.create(comment);
    return returnAwait;
};

/**
 * 
 * @param {Array of Objects} comments -> objects to be added 
 * @param {Object} options -> optional parameters
 * @returns {Object} returned objects 
 */
const createMany = async(comments, options) => {
    const returnAwait = await Comment.insertMany(comments, { ordered: false });
    return returnAwait;
};

/**
 * 
 * @param {Object} options -> defines parameters on find
 * @returns {Object} found object
 */
const readOne = async(options) => {
    const returnAwait = await Comment.findOne(options);
    return returnAwait;
};

/**
 * 
 * @param {Object} options -> defines parameters on find
 * @returns {Object} found objects
 */
const readMany = async(options) => {
    const returnAwait = await Comment.find(options);
    return returnAwait;
};


module.exports = {
    createOne,
    createMany,
    readOne,
    readMany,
};
