const Comment = require('../models/Comment');
const userController = require('./user-controller');
const gamethreadController = require('./gamethread-controller');

/**
 * 
 * @param {Object} comment -> comment to be created
 * @param {Object} options -> optional parameters
 * @returns {Object} created object
 */
const createOne = async(comment, options) => {
    const returnAwait = await Comment.create(comment);
    const passToSync = {
        _id: returnAwait._id,
        owner: returnAwait.owner,
        slug: returnAwait.slug,
    };
    const fromSync = await syncUserAndGamethread(passToSync, 1);
    const returnObj = {
        _id: returnAwait._id,
        owner: returnAwait.owner,
        gravatar: returnAwait.gravatar,
        text: returnAwait.text,
        createdAt:returnAwait.createdAt,
        isRootComment: returnAwait.isRootComment,
        slug: returnAwait.slug,
        gameThreadReference: returnAwait.gameThreadReference,
        serverMessage: fromSync,
    };
    return returnObj;
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
    const returnArray = [];
    for(let i = 0; i < returnAwait.length; ++i) {
        returnArray.push({
            _id: returnAwait[i]._id,
            owner: returnAwait[i].owner,
            // gravatar: returnAwait[i].gravatar,
            text: returnAwait[i].text,
            createdAt: returnAwait[i].createdAt,
            isRootComment: returnAwait[i].isRootComment,
            slug: returnAwait[i].slug,
            gameThreadReference: returnAwait[i].gameThreadReference,
            replies: returnAwait[i].replies,
            betReference: returnAwait[i].betReference,
        });
    }
    return returnArray;
};

/**
 * 
 * @param {Object} options -> defines the parameters to find
 * @returns {array of Objects}
 */
const readWithBets = async(options) => {
    const returnAwait = await Comment
        .find(options)
        .populate('betReference');
    const returnArray = [];
    for(let i = 0; i < returnAwait.length; ++i) {
        const filtered = returnAwait[i].toObject();
        // delete filtered.ownerObj;
        // delete filtered.betReference.owner;
        returnArray.push(filtered);
    }
    return returnArray;
};

/**
 * Updates a single comment
 * @param {Object} comment comment id
 * @param {Object} options Additional parameters
 * @returns Response
 */
const updateOne = async (comment, options) => {
    const doc = await Comment.findByIdAndUpdate(comment, { $set: options }, { new: true });
    return doc;
};

/**
 * Updates many comments
 * @param {Object} options Additional parameters, whatever needs to be
 * updated based of the route or caller of this controller.
 * updates all users
 */
const updateMany = async (options) => {
    const docs = await Comment.updateMany({}, { $set: options }, { new: true });
    return docs;
};


/**
 * 
 * @param {options} -> parameters to be updated on. 
 * @returns response
 */
const deleteOne = async (options) => {
    const returnAwait = await Comment.deleteOne(options);
    return returnAwait;
};

/**
 * 
 * @param {options} -> parameters to be updated on. 
 * @returns response
 */
const deleteMany = async options => {
    const returnAwait = await Comment.deleteMany(options);
    return returnAwait;
};

/**
 * 
 * @param {Object} syncRequest -> comment obj
 * @param {Integer} analog -> analog switch 
 */
const syncUserAndGamethread = async(syncRequest, analog) => {
    if(analog === 1) {
        const commentObj = await Comment
            .findOne({ _id: syncRequest._id })
            .populate('ownerObj')
            .populate('gameThreadReference');
        const user = commentObj.ownerObj;
        const gamethread = commentObj.gameThreadReference;
        commentsArrayUser = user.comments;
        commentsArrayGamethread = gamethread.comments;
        commentsArrayUser.push(syncRequest._id);
        commentsArrayGamethread.push(syncRequest._id);
        const userUpdate = await userController.updateOne(user._id.toString(), {
            comments: commentsArrayUser,
        });
        const gamethreadUpdate = await gamethreadController.updateOne(gamethread._id.toString(), {
            comments: commentsArrayGamethread,
        });
        if(userUpdate && gamethreadUpdate) {
            return `Success commenting on ${syncRequest.slug} by ${syncRequest.owner}`;
        } else {
            return `Failed commenting on ${syncRequest.slug} by ${syncRequest.owner}`;
        }
    } else if(analog === 2) {
        // TODO
        return `this analog has yet to be implemented`;
    } else {
        return `Hit bottom else`;
    }
};


module.exports = {
    createOne,
    createMany,
    readOne,
    readMany,
    readWithBets,
    updateOne,
    updateMany,
    deleteOne,
    deleteMany
};
