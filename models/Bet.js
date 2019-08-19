/** Bet Model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const betSchema = new Schema({
    owner: {
        ownerID: String,
        objectReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    gameReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'game',
    },
    gameThreadReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gamethread',
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team',
    },
    slicesBet: {
        type: Number,
        default: 0,
    },
    isWin: Boolean,
});

betSchema.plugin(mongodbErrorHandler);

const Bet = mongoose.model('bet', betSchema);

module.exports = Bet;