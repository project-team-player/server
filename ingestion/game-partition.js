const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const teamController = require('../controllers/team-controller');
const gameController = require('../controllers/game-controller');

const runEngine = async () => {
    try {
        mongoose.connect(process.env.DATABASE_CONNECTION);
        mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
        const data = await axios.get(`${process.env.SPORTSDATAIO_BASE_URL}Schedules/2019?key=${process.env.SPORTSDATAIO_API_KEY}`);
        const gameData = data.data; // all the data for games are now here
        const pushToDBGames = [];
        /**
         * 1. Loop through all the gameData
         * 2. For each Object in the loop, target 'AwayTeam' and 'HomeTeam'
         * 3. DB Search: Find the TEAM that corresponds with AwayTeam and HomeTeam keys.
         * 4. Populate objects with the found data.
         * 5. DB Add: Add the game to the 'games' collection.
         */
        for(let i = 0; i < gameData.length; ++i) {
            if(gameData[i].AwayTeam === 'BYE' || gameData[i].HomeTeam === 'BYE') { continue; }
            const away = await teamController.readOne({ key: gameData[i].AwayTeam });
            const home = await teamController.readOne({ key: gameData[i].HomeTeam });
            // build the game object
            const game = {
                week: gameData[i].Week,
                gameKey: gameData[i].GameKey,
                globalGameID: gameData[i].GlobalGameID,
                awayTeam: {
                    key: away.key,
                    awayID: away._id.toString(),
                    logo: away.wikiLogoURL,
                    name: away.fullName,
                    primaryColor: away.primaryColor,
                    secondaryColor: away.secondaryColor,
                    tertiaryColor: away.tertiaryColor,
                    objectReference: away._id,
                },
                homeTeam: {
                    key: home.key,
                    homeID: home._id.toString(),
                    logo: home.wikiLogoURL,
                    name: home.fullName,
                    primaryColor: home.primaryColor,
                    secondaryColor: home.secondaryColor,
                    tertiaryColor: home.tertiaryColor,
                    objectReference: home._id,
                }, 
                awayScore: 0,
                homeScore: 0,
                winner: 'In Progress',  
                date: gameData[i].Day,
                dateTime: gameData[i].DateTime,
                gameThreadReference: {},
                stadium: gameData[i].StadiumDetails.Name,
                city: gameData[i].StadiumDetails.City,
                state: gameData[i].StadiumDetails.State,
                country: gameData[i].StadiumDetails.Country,
                slug: `${away.key}-vs-${home.key}-${gameData[i].Day.slice(0, 4)}-week-${gameData[i].Week}`,
            };
            pushToDBGames.push(game);
        }
        await gameController.createMany(pushToDBGames);
        // close db when youre done
        mongoose.disconnect();
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    runEngine,
}