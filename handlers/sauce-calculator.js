/**
 * Calculates percentages of bets for the 2 teams that are playing.
 * For 'Whos got the sauce' feature in the front end.
 * 1. Check the gamethread.bets array
 *      -> IF empty, return 0, 0.
 *      -> ELSE 
 *          -> For each element on the bets array.
 *          -> find the bet associated bet with the ID
 *          -> tally the percentages of teams that played
 * 2. Return the percentages in an object.
 */
const betController = require('../controllers/bet-controller');
const gameController = require('../controllers/game-controller')

const teamPercentages = async (gamethreadObj) => {
    if(gamethreadObj.bets === undefined || gamethreadObj.bets.length === 0) {
        const game = await gameController.readOne({ slug: gamethreadObj.slug });
        const awayTeam = game.awayTeam.key;
        const homeTeam = game.homeTeam.key;
        let percentages = {};
        percentages[awayTeam] = 0;
        percentages[homeTeam] = 0;
        return percentages;
    } else { 
        const game = await gameController.readOne({ slug: gamethreadObj.slug });
        const awayTeam = game.awayTeam.key;
        const homeTeam = game.homeTeam.key;
        let awayCount = 0;
        for(let i = 0; i < gamethreadObj.bets.length; ++i) {
            const bet = await betController.readMany({ _id: gamethreadObj.bets[i] });
            if(bet[0].key === awayTeam) {
                awayCount++;
            }
        }
        const awayPercentage = (awayCount / gamethreadObj.bets.length) * 100;
        const homePercentage = 100 - awayPercentage;
        let percentages = {};
        percentages[awayTeam] = awayPercentage;
        percentages[homeTeam] = homePercentage;
        return percentages;
    }
};

module.exports = {
    teamPercentages,
};