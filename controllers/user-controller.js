const User = require('../models/User');
const betController = require('./bet-controller');

/**
 * 
 * @param {Object} user -> The user to be added
 * @param {Object} options -> optional parameters
 * @returns Object created
 */
const createOne = async (user, options) => {
    const returnAwait = await User.create(user);
    return returnAwait;
}

const createMany = async (users, options) => {
    const returnAwait = await User.insertMany(users, { ordered: false });
    return returnAwait;
}

/**
 * 
 * @param {Object} options -> defines the parameters on what to find  
 * @returns Object read
 */
const readOne = async (options) => {
    const returnAwait = await User.findOne(options);
    return returnAwait;
};

/**
 * 
 * @param {Object} options -> defines parameters to find
 * @returns {Object} found Object(s)
 */
const readMany = async (options) => {
    const returnAwait = await User.find(options);
    return returnAwait;
};

/**
 * 
 * @param {ObjectID} -> id of the user that will use this controller
 * @param {Object} options -> optional parameters
 * @returns {Array} of Bet objects 
 */
const readAllBets = async (user, options) => {
    const foundUser = await User.findOne({ _id: user });
    // perform if user's bets array isnt empty
    if(foundUser.bets.length !== 0) {
        const returnArray = [];
        for(let i = 0; i < foundUser.bets.length; ++i) {
            const bet = await betController.readOne({ _id: foundUser.bets[i] });
            returnArray.push(bet);
        }
        return returnArray;
    }
    // else bet array is empty return error message
    const returnedMsg = {
        serverMessage: `${foundUser.username} has not placed any bets`,
    };
    return returnedMsg;   
};

/**
 * 
 * @param {Object} user -> user id 
 * @param {Object} options -> update parameters
 * @returns {Object}
 */
const updateOne = async (user, options) => {
    const returnAwait = await User.findByIdAndUpdate(user, { $set: options }, { new: true });
    return returnAwait;
};

/**
 * 
 * @param {Object} options -> Defines parameters to update.
 * @returns {Object} returnedObj -> an object with message.
 */
const updateMany = async (options) => {
    const users = await User.updateMany({}, { $set: options }, { new: true });
    const returnObj = {
        serverMessage: `${users.length} items updated with updateMany`,
    };
    return returnObj;
};

/**
 * 
 * @param {Object} options -> contains 'analog'. Decides between
 * global and weekly leaderboard.
 * @returns {Array} of objects sorted in descending order
 * based on the value of a user's 'pizzaSlicesTotal' for global.
 * Different options.analog for different results (global or weekly)
 */
const leaderBoard = async (options) => {
    if(options.analog === 1) {
        // GLOBAL LEADERBOARD
        const users = await User
            .find()
            .sort({
                pizzaSlicesTotal: -1,
            });
        const returnArray = arrayTrim(users);
        return returnArray;
    } else if(options.analog === 2) {
        // WEEKLY LEADERBOARD. OPTIONS OBJECT MUST
        // CONTAIN WEEK NUMBER AS WELL
        const placeHolder = `slicesWeek${options.week}`;
        const users = await User
            .find()
            .sort({
                [placeHolder]: -1,
            });
        const returnArray = arrayTrim(users);
        return returnArray;
    } else {
        const serverMessage = `Error: that analog isn't functional`;
        return serverMessage;
    }
};

/**
 * 
 * @param {Array} users -> array of objects. 
 * @returns {Array} -> array of objects
 * does the necessary trimming of each of the array
 */
const arrayTrim = (users) => {
    const returnArray = [];
    for(let i = 0; i < users.length; ++i) {
        const filtered = users[i].toObject();
        delete filtered.permissions;
        delete filtered.weeklyWins;
        delete filtered.weeklyLoses;
        delete filtered.globalRank;
        delete filtered.badge;
        delete filtered.favoriteTeams;
        delete filtered.achievements;
        delete filtered.bets;
        delete filtered.accumulatedBets;
        delete filtered.comments;
        delete filtered._id;
        delete filtered.email;
        delete filtered.password;
        returnArray.push(filtered);
    }
    return returnArray;
}

module.exports = {
    createOne,
    createMany,
    readOne,
    readMany,
    readAllBets,   
    updateOne,
    updateMany,
    leaderBoard,
};