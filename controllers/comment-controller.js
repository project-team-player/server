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
            votes: returnAwait[i].votes,
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

/**
 * 
 * @param {Object} req -> the express request object
 * @param {Object} res -> the express response object
 * @param {Object} options -> Options for adding and removal properties
 * @param {String} [options.addVote] -> Type of vote you want to add to comment: specify "up" or "down"
 * @param {String} options.remove -> Type of vote you want to remove from comment: specify "up" or "down"
 * @returns {Void} 
 */
const updateVotes = async (req, res, { addVote = false, removeVote = false, isReply = false }) => {
    const { _id: userId } = req.user;
    const { commentId, replyId } = req.params;
    let options = {};

    if (isReply) { 
        options[`replies._id`] = replyId;
    }

    // Adds and removes votes to comment if specified in arguments. Else it just removes specified vote.
    if (!addVote) {
        if (isReply) {
            options = {
                $pull: { [`replies.$[e].votes.${removeVote}`]: userId }
            }
        } else {
            options = {
                $pull: { [`votes.${removeVote}`]: userId }
            }
        }
    } else {
        if (isReply) {
            options = {
                $addToSet: { [`replies.$[e].votes.${addVote}`]: userId },
                $pull: { [`replies.$[e].votes.${removeVote}`]: userId },
            }
        } else {
            options = {
                $addToSet: { [`votes.${addVote}`]: userId },
                $pull: { [`votes.${removeVote}`]: userId },
            }
        }
    }

    let comment = {};

    // If the comment is a reply to another comment, find reply and update.
    if (isReply) {
        comment = await Comment.findByIdAndUpdate(commentId, options,
            {
                fields: { votes: 1 },
                new: true,
                arrayFilters: [{ "e._id": replyId }],
            },
            (error, doc) => {
                if (error) {
                    res.status(500).json('Error: something went wrong on the server.');
                }
            }
        )
    // If the comment is a root comment
    } else {
        comment = await Comment.findByIdAndUpdate(commentId, options, 
            {
                fields: { votes: 1 },
                new: true,
            },
            (error, doc) => {
                if (error) {
                    res.status(500).json('Error: something went wrong on the server.');
                }
            }
        )
    }  
    res.locals.comment = comment;
}


module.exports = {
    createOne,
    createMany,
    readOne,
    readMany,
    readWithBets,
    updateOne,
    updateMany,
    updateVotes,
    deleteOne,
    deleteMany
};
