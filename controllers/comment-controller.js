const Comment = require('../models/Comment');
const userController = require('./user-controller');
const gamethreadController = require('./gamethread-controller');

/**
 *
 * @param {Object} comment -> comment to be created
 * @param {Object} options -> optional parameters
 * @returns {Object} created object
 */
const createOne = async (comment, options) => {
  const returnAwait = await Comment.create(comment);
  const passToSync = {
    _id: returnAwait._id,
    owner: returnAwait.owner,
    slug: returnAwait.slug
  };
  const fromSync = await syncUserAndGamethread(passToSync, 1);
  const returnObj = {
    _id: returnAwait._id,
    owner: returnAwait.owner,
    text: returnAwait.text,
    createdAt: returnAwait.createdAt,
    isRootComment: returnAwait.isRootComment,
    slug: returnAwait.slug,
    gameThreadReference: returnAwait.gameThreadReference,
    serverMessage: fromSync
  };
  return returnObj;
};

/**
 *
 * @param {Array of Objects} comments -> objects to be added
 * @param {Object} options -> optional parameters
 * @returns {Object} returned objects
 */
const createMany = async (comments, options) => {
  const returnAwait = await Comment.insertMany(comments, { ordered: false });
  return returnAwait;
};

/**
 *
 * @param {Object} options -> defines parameters on find
 * @returns {Object} found object
 */
const readOne = async options => {
  const returnAwait = await Comment.findOne(options);
  return returnAwait;
};

/**
 *
 * @param {Object} options -> defines parameters on find
 * @returns {Object} found objects
 */
const readMany = async options => {
  const returnAwait = await Comment.find(options);
  const returnArray = [];
  for (let i = 0; i < returnAwait.length; ++i) {
    returnArray.push({
      _id: returnAwait[i]._id,
      owner: returnAwait[i].owner,
      text: returnAwait[i].text,
      createdAt: returnAwait[i].createdAt,
      isRootComment: returnAwait[i].isRootComment,
      slug: returnAwait[i].slug,
      gameThreadReference: returnAwait[i].gameThreadReference
    });
  }
  return returnArray;
};

/**
 *
 * @param {*} options
 */
const updateOne = async (comment, options) => {
  const doc = await Comment.findByIdAndUpdate(
    comment,
    { $set: options },
    { new: true }
  );
  return doc;
};

/**
 * Updates many users with a batch request
 * @param {Object} options Additional parameters, whatever needs to be
 * updated based of the route or caller of this controller.
 * updates all comments
 */
const updateMany = async options => {
  const docs = await Comment.updateMany({}, { $set: options }, { new: true });
  return docs;
};

/**
 *
 * @param {Object} options -> defines the parameters of what Object to delete
 * @returns Response
 */

const deleteOne = async options => {
  const returnAwait = await Comment.deleteOne(options);
  return returnAwait;
};

/**
 * Deletes many users with a batch request
 * @param {Object} options defines objects to delete
 * @returns Response
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
const syncUserAndGamethread = async (syncRequest, analog) => {
  if (analog === 1) {
    const commentObj = await Comment.findOne({ _id: syncRequest._id })
      .populate('ownerObj')
      .populate('gameThreadReference');
    const user = commentObj.ownerObj;
    const gamethread = commentObj.gameThreadReference;
    commentsArrayUser = user.comments;
    commentsArrayGamethread = gamethread.comments;
    commentsArrayUser.push(syncRequest._id);
    commentsArrayGamethread.push(syncRequest._id);
    const userUpdate = await userController.updateOne(user._id.toString(), {
      comments: commentsArrayUser
    });
    const gamethreadUpdate = await gamethreadController.updateOne(
      gamethread._id.toString(),
      {
        comments: commentsArrayGamethread
      }
    );
    if (userUpdate && gamethreadUpdate) {
      return `Success commenting on ${syncRequest.slug} by ${syncRequest.owner}`;
    } else {
      return `Failed commenting on ${syncRequest.slug} by ${syncRequest.owner}`;
    }
  } else if (analog === 2) {
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
  updateOne,
  updateMany,
  deleteOne,
  deleteMany
};
