/**
 * This is resolver is only to be executed after 'resolve-user-awards.js' has finished
 * executing. Currently, this is the last resolver in the execution chain. 
 * This accomplishes weekly resets. And by weekly, it is defined as the end 
 * of an NFL week which is Monday night after the last MOnday night game.
 * But this will probably run when we get back to the office on Tuesday morning.
 * Fields that need to be reset weekly
 * ------------------------------------------------------------------------------
 * User
 * -> 'bets' into 'accumulatedBets' then empty 'bets'
 *      CAUTION: some muthafuckas bet in advance, only transfer their
 *      bets into accumulators if the week matches current week. 
 *      Leave everything else.
 * -> 'pizzaSlicesWeekly' into 'pizzaSlicesTotal' then reset 
 *    'pizzaSlicesWeekly' into 64
 * -> 'weeklyWins' into 'wins' then reset 'weeklyWins' to 0
 * -> 'weeklyLoses' into 'loses' then reset 'weeklyLoses' to 0.
 * -> 'pizzaSlicesWonWeek' reset back to 0.
 * ------------------------------------------------------------------------------
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const userController = require('../controllers/user-controller');
const betController = require('../controllers/bet-controller');

const resolveResets = async (week, dbName) => {
    // create DB conn string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        await mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
        const users = await userController.readMany({});
        // manipulate each users resetable fields
        for(let i = 0; i < users.length; i++) {
            // jump to the next iteration if the user's bets array is empty
            if(users[i].bets === undefined || users[i].bets.length === 0) {
                continue;
            }
            const accumulatedBets = users[i].accumulatedBets;
            // bets into accumulatedBets then empty bets
            // EXCEPT bets that havent happened yet.
            for(let j = 0; j < users[i].bets.length; j++) {
                const bet = await betController.readOne({ _id: users[i].bets[j] });
                if(!bet) {
                    // next iteration
                    continue;
                }
                // take the bet's week from its slug , refer to slug structures on DB
                let betWeek;
                bet.slug[bet.slug.length - 2] === '-' ?
                    betWeek = parseInt(bet.slug.slice(-1)) : betWeek = parseInt(bet.slug.slice(-2));
                // only do splicing if betWeek and week are the same
                if(betWeek === week) {
                    accumulatedBets.push(users[i].bets[j]);
                    users[i].bets[j] = 'removed'; // temp place holder
                }
                // else. next iteration
            }
            /**
             * Fix users[i].bets. Take off elements called 'removed'
             * then resize the array.
             */
            const cleansedArray = [];
            for(let k = 0; k < users[i].bets.length; k++) {
                if(users[i].bets[k] !== 'removed') {
                    cleansedArray.push(users[i].bets[k]);
                }
            }
            // Bets on week are now in accumulatedBets and bets is reset to just bets
            // that have yet to be resolved aka future games.
            // pizzaSlicesWeekly into pizzaSlicesTotal then reset
            let pizzaSlicesTotal = users[i].pizzaSlicesTotal;
            pizzaSlicesTotal += users[i].pizzaSlicesWeekly;
            // do this for the weekly leaderboards.
            const weeklySlices = users[i].pizzaSlicesWeekly;
            const placeHolder = `slicesWeek${week}`;
            // reset pizzaSlicesWeekly to 64 at the DB update later
            // weeklyWins into wins then reset
            let wins = users[i].wins;
            wins += users[i].weeklyWins;
            // reset weeklyWins to 0 at the DB update later.
            // weeklyLoses into loses then reset
            let loses = users[i].loses;
            loses += users[i].weeklyLoses;
            // reset weeklyLoses to 0 at the DB update later.
            // reset pizzaSlicesWonWeek at the DB update later.
            // DB update here
            await userController.updateOne(users[i]._id, {
                accumulatedBets,
                bets: cleansedArray,
                pizzaSlicesTotal,
                pizzaSlicesWeekly: 64,
                wins,
                weeklyWins: 0,
                loses,
                weeklyLoses: 0,
                pizzaSlicesWonWeek: 0,
                [placeHolder]: weeklySlices,
            });
            // updating current user DONE
        }   
        await mongoose.disconnect();
        const returnObj = {
            message: `${users.length} users executed their weekly reset`,
        };
        return returnObj;
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

// write script here for it to be callable
// ITS called the 'bitch dont run my scripts' lock

module.exports = {
    resolveResets,
};