/** Gamethread model */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const gamethreadSchema = new Schema({
    week: Number,
    homeTeam: {
        name: String,
        objectReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'team',
        },
    },
    awayTeam: {
        name: String,
        objectReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'team',
        },
    },
    gameStartTime: {
        type: Date,
    },
    bets: [
        {
            betID: String,
            objectReference: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'bet',
            },
        },
    ],
    winner: {
        name: String,
        default: 'In Progress',
        objectReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'team',
        },
    },
    isFinished: {
        type: Boolean,
        default: false,
    },
    comments: [
        {
            commentID: String,
            objectReference: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comment',
            }
        }
    ],
});

gamethreadSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Gamethread', gamethreadSchema);