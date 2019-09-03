/** Comment Model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const commentSchema = new Schema({
    owner: String,
    ownerObj: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    text: String,
    createdAt: String,
    isRootComment: Boolean, // only allow nested comments if this is true.
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment',
        }
    ],
    slicesToEnter: {
        type: Number,
        default: 4,
    },
    gameThreadReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gamethread',
    },
    slug: String,
    betReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bet',
    },
});

commentSchema.plugin(mongodbErrorHandler);

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;