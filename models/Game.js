/** Game Model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const gameSchema = new Schema({
    week: Number,
    awayTeam: {
        key: String,
        awayID: String,
        logo: String,
        name: String,
        primaryColors: String,
        secondaryColors: String,
        tertiaryColors: String,
        objectReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'team',
        },
    },
    homeTeam: {
        key: String,
        homeID: String,
        logo: String,
        name: String,
        primaryColors: String,
        secondaryColors: String,
        tertiaryColors: String,
        objectReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'team',
        },
    },
    date: String,       // OR Date Format
    dateTime: String,   // OR Date Format
    isFinished: {
        type: Boolean,
        default: false,
    },
    winner: {
        name: String,
        default: 'In Progress',
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