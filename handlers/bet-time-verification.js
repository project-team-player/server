/**
 * Disables bets if the user bets at a time that the game starts
 * 1. obtain the 'dateTime' field in the gamethread. 
 * 2. IF the current time is equal to or greater than the 
 *    gamethread's 'dateTime', disallow the user from betting.
 * 3. ELSE allow the user to bet. 
 */
const moment = require('moment');

/**
 * 
 * @param {String} time -> time derived from the front end
 * @returns {Boolean} true of false
 * time parameter comes in eastern zone format
 * 1. convert this into pacific 
 * 2. get the current time from moment(). this defaults to pacific
 * 3. compare. 
 */
const isExpired = async (time) => {
    // game time from args its eastern
    let gameTime = await moment(time).format('YYYY MM DD h mm');
    let hour = gameTime.split(' ')[3];
    hour = hour - 3; // convert hr into pacific time
    gameTime = gameTime.split(' ');
    gameTime[3] = hour;

    // local time is set in here
    let localTime = await moment().format('YYYY MM DD h mm');
    localTime = localTime.split(' ');
    // do comparisons now
    // year
    if(parseInt(gameTime[0]) < parseInt(localTime[0])) {
        return false;
    } 
    // month
    if(parseInt(gameTime[1]) < parseInt(localTime[1])) {
        return false;
    }
    // day
    if(parseInt(gameTime[2]) < parseInt(localTime[2])) {
        return false;
    }
    // hour
    if(parseInt(gameTime[3]) <= parseInt(localTime[3])) {
        // min
        if(parseInt(gameTime[4]) > parseInt(localTime[4])) {
            return true;
        }
        return false;
    }
    return true; 
};

module.exports = {
    isExpired,
};  

// YYYY MM DD h mm -> format to be used
// ddd, MMM Do h:mm A -> jon and hans format
// Thu, Sep 5th 5:43 PM
// [ 'Thu,', 'Sep', '5th', '5:45', 'PM' ]
