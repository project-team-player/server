/** Gamethread model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const gamethreadSchema = new Schema({
    game: {
        gameID: String,
        objectReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'game',
        }
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

const Gamethread =  mongoose.model('gamethread', gamethreadSchema);

module.exports = Gamethread;