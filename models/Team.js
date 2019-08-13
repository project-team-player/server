/** Team Model */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const teamSchema = new teamSchema({
    fullName: String,
    key: String,
    placeName: String,
    teamName: String,
    conference: String,
    division: String,
    byeWeek: Number,
    headCoach: String,
    offensiveCoordinator: String,
    defensiveCoordinator: String,
    specialTeamsCoach: String,
    wins: {
        type: Number,
        default: 0,
    },
    losses: {
        type: Number,
        default: 0,
    },
    draws: {
        type: Number,
        default: 0,
    },
    wikiLogoURL: String,
    wikiWordMarkURL: String,
    primaryColor: String,
    secondaryColor: String,
    tertiaryColor: String,
    stadiumDetails: {
        stadiumName: String,
        stadiumCity: String,
        stadiumState: String,
        capacity: Number,
        playingSurface: String,
        type: String,
        geoLat: Number,
        geoLong: Number,
    },
});

teamSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Team', teamSchema);