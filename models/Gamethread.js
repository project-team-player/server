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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bet',
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment',
        }
    ],
    week: Number,
    slug: String, 
});

gamethreadSchema.plugin(mongodbErrorHandler);

const Gamethread =  mongoose.model('gamethread', gamethreadSchema);

module.exports = Gamethread;