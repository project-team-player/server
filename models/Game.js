/** Game Model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('slugs');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const gameSchema = new Schema({
    week: Number,
    gameKey: String,
    globalGameID: String,
    slug: String,
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

/**
 * Slug generator. Pre save hook on 'slug' property.
 * code executes before saving.
 */
gameSchema.pre('save', async function(next) {
    awayKey = this.awayTeam.key;
    homeKey = this.homeTeam.key;
    year = this.date.slice(0, 3);
    preSlug = `${awayKey}vs${homeKey}${year}week{this.week}`;
    // example: DAL-vs-MIN-2019-week-1
    this.slug = slug(preSlug);
    next();
});

gameSchema.plugin(mongodbErrorHandler);

const Game = mongoose.model('game', gameSchema);

module.exports = Game;