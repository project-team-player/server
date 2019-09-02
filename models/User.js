/* User Model */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

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
    password: {
        type: String,
        required: 'Supply a password',
    },
    permissions: {
        type: Number,
        default: 0,
    },
    pizzaSlicesTotal: {
        // accumulated pizza slices, receiver of the dump
        // from pizzaSlicesWeekly
        type: Number,
        default: 0,
    },
    pizzaSlicesWeekly: {
        // given to the user at the start of each week
        type: Number,
        default: 64,
    },
    pizzaSlicesWonWeek: {
        // accumulation of pizzaslices won on each bet on 
        // a given week.
        type: Number,
        default: 0,
    },
    wins: {
        // total wins!
        type: Number,
        default: 0,
    },
    loses: {
        type: Number,
        default: 0,
    },
    weeklyWins: {
        // wins in the week, resets after each week, gets dumped
        // into the 'wins' field.
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
        // This will only refer to bets made in a week. Previous bets will 
        // be moved to the accumulatedBets (see below) after the end 
        // of the NFL week.
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bet',
        },
    ],
    accumulatedBets: [
        // every bet from bets array moves here after the end of the week.
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bet',
        }
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
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment',
        },
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

/**
 * Pre-save hook on 'password' property, this code will
 * execute before saving.
 */
userSchema.pre('save', async function(next){
    // if password isnt modified, no need to mod it
    if(!this.isModified('password')) {
        return next(); // GTFO and move on
    }
    // password is modified, salt and hash it
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
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

// better error messages
userSchema.plugin(mongodbErrorHandler); 

const User = mongoose.model('user', userSchema);

module.exports = User;

