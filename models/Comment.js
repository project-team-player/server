/** Comment Model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const commentSchema = new Schema({
    owner: {
        ownerID: String,
        objectReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    },
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
});

commentSchema.plugin(mongodbErrorHandler);

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;