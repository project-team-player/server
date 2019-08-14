/** Game Model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const gameSchema = new Schema({
    week: Number,
    gameKey: String,
    globalGameID: String,
    awayTeam: {
        type: Object,
        key: String,
        awayID: String,
        logo: String,
        name: String,
        primaryColor: String,
        secondaryColor: String,
        tertiaryColor: String,
        objectReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'team',
        },
    },
    homeTeam: {
        type: Object,
        key: String,
        homeID: String,
        logo: String,
        name: String,
        primaryColor: String,
        secondaryColor: String,
        tertiaryColor: String,
        objectReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'team',
        },
    },
    awayScore: Number,
    homeScore: Number,
    date: String,       // OR Date Format
    dateTime: String,   // OR Date Format
    isFinished: {
        type: Boolean,
        default: false,
    },
    winner: {
        name: String,
        objectReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'team',
        },
    },
    gameThreadReference: {
        gameThreadID: String,
        objectReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'gamethread',
        },
    },
    // location details
    stadium: String,
    city: String,
    state: String,
    country: String,
});

gameSchema.plugin(mongodbErrorHandler);

const Game = mongoose.model('game', gameSchema);

module.exports = Game;