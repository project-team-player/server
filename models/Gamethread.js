/** Gamethread model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const gamethreadSchema = new Schema({
    game: {
        type: Object,
        gameID: String,
        objectReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'game',
        }
    },
    bets: [
        {
            type: Object,
            betID: String,
            objectReference: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'bet',
            },
        },
    ],
    comments: [
        {
            type: Object,
            commentID: String,
            objectReference: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comment',
            }
        }
    ],
    week: Number,
});

gamethreadSchema.plugin(mongodbErrorHandler);

const Gamethread =  mongoose.model('gamethread', gamethreadSchema);

module.exports = Gamethread;