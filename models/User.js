/* User Model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: 'Supply a name',
        trim: true,
    },
    username: {
        type: String,
        required: 'Supply a username',
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'Supply an email address',
    },
    // password will be kept by passport
    permissions: {
        type: Number,
        default: 0,
    },
    pizzaSlicesTotal: {
        type: Number,
        default: 0,
    },
    pizzaSlicesWeekly: {
        type: Number,
        default: 0,
    },
    wins: {
        type: Number,
        default: 0,
    },
    loses: {
        type: Number,
        default: 0,
    },
    commends: {
        type: Number,
        default: 0,
    },
    reports: {
        type: Number,
        default: 0,
    },
    favoriteTeams: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team',
        },
    ],
    friends: [
        {
            friendID: String,
            objectReference: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        },
    ],
    leagues: [
        {
            leagueID: String,
            objectReference: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'league',
            },
        },
    ],
    bets: [
        {
            betID: String,
            objectReference: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'bet',
            },
        },
    ],
    globalRank: {
        type: Number,
        default: 0,
    },
    badge: {
        type: String,
        default: 'apprentice',
    },
    achievements: [
        {
            type: String,
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

// VIRTUAL FIELD used for a user's gravatar
userSchema.virtual('gravatar').get(function() {
    /**
     * hash email
     * use hash to find gravatar
     * note: default ones will be provided or ones with no image
     */
    const hash = md5(this.email);
    return `https://gravatar.com/avatar/${hash}?s=200`;
});

// authenticate with passport-local-mongoose
// will then be able to use a '.register' method on the controller
// that is in charge of creating a user.
userSchema.plugin(passportLocalMongoose, { usernameField: 'email', });
userSchema.plugin(mongodbErrorHandler); // better error messages

module.exports = mongoose.model('User', userSchema);

