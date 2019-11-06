/**
 * Reset accumulated bets on some users with long ass 
 * accumulated bets.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const userController = require('../controllers/user-controller');

const resetAccumulatedBets = async (username, dbName) => {
    // create a DB string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        await mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
        const user = await userController.readOne({ username });
        await userController.updateOne(user._id, {
            accumulatedBets: [],
        });

        await mongoose.disconnect();
        const msg = `${user.username} has his/her accumulated bets reset`;
        return console.log(msg);
    } catch (err) {
        console.log(`Error has occured ${err}`);
    }
};

resetAccumulatedBets(process.argv[2], process.argv[3]);