/** Bet Model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const betSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    gameThreadReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gamethread',
    },
    teamReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team',
    },
    key: String,
    slug: String,
    slicesBet: {
        type: Number,
        default: 0,
    },
    isWin: Boolean,
    disabled: false,
    commentReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
    },
});

betSchema.plugin(mongodbErrorHandler);

const Bet = mongoose.model('bet', betSchema);

module.exports = Bet;