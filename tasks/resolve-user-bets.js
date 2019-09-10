/**
 * Each user who has betted on the week will have their bet array 
 * populated. 
 * 1. Get all users in the DB
 * 2. read all their bets in their bets array 
 * 3. for each bet, look at the 'isWin' field
 * 4. IF 'isWin' is true, increment user's 'weeklyWins' AND add 
 *  'slicesBet' on the bet into the user's 'pizzaSlicesWonWeek' field
 * 5. ELSE 'isWin is false, increment 'weeklyLoses'. 
 *      CAUTION: some people bet on weeks in advance. 
 * 6. Update the user with its 'weeklyWins' and 'pizzaSlicesWonWeek' fields.
 * NOTE: must only run after 'resolve-bets.js' has been run.
 * After running this program, the users on the DB should have their
 * 'weeklyWins' and 'pizzaSlicesWonWeek' fields updated to reflect their won bets.
 * Computationally expensive. All users are in an array, each of them 
 * has an array of bets. Big O(n ^ 2). 
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const betController = require('../controllers/bet-controller');
const userController = require('../controllers/user-controller');

const resolveBets = async (week, dbName) => {
    // create DB conn string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        await mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
        // 1
        const users = await userController.readMany({});
        for(let i = 0; i < users.length; ++i) {
            // continue into the next iteration if the user's bets array is empty
            if(users[i].bets === undefined || users[i].bets.length === 0) {
                continue;
            }
            // Because of these next 2 variables, it is MANDAFUCKINGTORY to 
            // reset the 'weeklyWins' and 'pizzaSlicesWonWeek' fields in each 
            // user every closing of the NFL week. Consider yourself warned.
            let betsWon = users[i].weeklyWins; 
            let betsLost = users[i].weeklyLoses;
            let slicesWon = users[i].pizzaSlicesWonWeek;
            // 2
            for(let j = 0; j < users[i].bets.length; ++j) {
                const bet = await betController.readOne({ _id: users[i].bets[j] });
                if(!bet) { 
                    // unclaimed bets, S.O.L
                    continue; 
                }
                // bet was identified, move on in here
                // take the bet's week from its slug , refer to slug structures on DB
                let betWeek;
                bet.slug[bet.slug.length - 2] === '-' ?
                    betWeek = parseInt(bet.slug.slice(-1)) : betWeek = parseInt(bet.slug.slice(-2));
                // 3
                if(bet.isWin === true) {
                    // 4 win is a win and only same week bets are checked for win anyway
                    betsWon++;
                    slicesWon += bet.slicesBet;
                } else if(bet.isWin === false && betWeek === week) {
                    // 5 BIG FAT L
                    betsLost++;
                } else {
                    // some muthafuckas just bet in advance
                    // dont count an 'L' against it, even though its really tempting
                    continue;
                }
            }
            // 6
            await userController.updateOne(users[i]._id, {
                weeklyWins: betsWon,
                weeklyLoses: betsLost,
                pizzaSlicesWonWeek: slicesWon,
            });
        }
        await mongoose.disconnect();
        const returnObj = {
            message: `${users.length} users have their bets resolved`,
        };
        return returnObj;

    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

// write script here for it to be callable
// ITS called the 'bitch dont run my scripts' lock

module.exports = {
    resolveBets,
};