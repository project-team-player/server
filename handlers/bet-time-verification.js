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
const isValidTime = async (time) => {
    // game time from args is in eastern timezone
    let validTime = true;
    let gameTime = await moment(time).format('YYYY MM DD H mm');
    let hour = gameTime.split(' ')[3];
    let day = gameTime.split(' ')[2];
    // convert hr into pacific time
    // 0 ET === 9 PT (21)
    // 1 ET === 10 PT (22)
    // 2 ET === 11 PT (23)
    // 3 ET === 12 PT (0)
    hour = parseInt(hour);
    day = parseInt(day);
    if(hour !== 0 && hour !== 1 && hour !== 2 && hour !== 3) { 
        hour -= 3; 
    } else {
        if(hour === 0) {
            hour = 21;
            day -= 1;
        } else if(hour === 1) { 
            hour = 22; 
            day -= 1;
        }
        else if(hour === 2) { 
            hour = 23; 
            day -= 1;
        }
        else{ 
            // no need to subtract day.
            hour = 0; 
        }
    }
    gameTime = gameTime.split(' ');
    gameTime[2] = day;
    gameTime[3] = hour;
    
    // local time is set in here
    let localTime = await moment().format('YYYY MM DD H mm');
    localTime = localTime.split(' ');
    // do comparisons now
    for (let i = 0; i < gameTime.length; ++i) {
        if(parseInt(gameTime[i]) < parseInt(localTime[i])) {
            // anything that the local time has greater than the 
            // game time, it is false, GTFO
            validTime = false;
            break;
        } else if(parseInt(gameTime[i]) > parseInt(localTime[i])) {
            // anything the game time has greater than the local
            // time, it is true, GTFO
            break;
        } else {
            // continue iterating with equality checks
            continue;
        }
    }
    
    return validTime; 
};

module.exports = {
    isValidTime,
};  

// YYYY MM DD h mm -> format to be used
// ddd, MMM Do h:mm A -> jon and hans format
// Thu, Sep 5th 5:43 PM
// [ 'Thu,', 'Sep', '5th', '5:45', 'PM' ]
