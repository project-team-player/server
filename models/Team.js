/** Team Model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const teamSchema = new Schema({
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
        type: Object,
    },
});

teamSchema.plugin(mongodbErrorHandler);

const Team = mongoose.model('team', teamSchema);

module.exports = Team;