const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const teamController = require('../controllers/team-controller');

const runEngine = async () => {
    try {
        mongoose.connect(process.env.DATABASE_CONNECTION);
        mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
        const data = await axios.get(`${process.env.SPORTSDATAIO_BASE_URL}Teams?key=${process.env.SPORTSDATAIO_API_KEY}`);
        const teamsData = data.data;
        const pushToDb = [];
        for(let i = 0; i < teamsData.length; ++i) {
            const team = {
                fullName: teamsData[i].FullName,
                key: teamsData[i].Key,
                placeName: teamsData[i].City,
                teamName: teamsData[i].Name,
                conference: teamsData[i].Conference,
                division: teamsData[i].Division,
                byeWeek: teamsData[i].ByeWeek,
                headCoach: teamsData[i].HeadCoach,
                offensiveCoordinator: teamsData[i].OffensiveCoordinator,
                defensiveCoordinator: teamsData[i].DefensiveCoordinator,
                specialTeamsCoach: teamsData[i].SpecialTeamsCoach,
                wins: 0,
                losses: 0,
                draws: 0,
                wikiLogoURL: teamsData[i].WikipediaLogoUrl,
                wikiWordMarkURL: teamsData[i].WikipediaWordMarkUrl,
                primaryColor: teamsData[i].PrimaryColor,
                secondaryColor: teamsData[i].SecondaryColor,
                tertiaryColor: teamsData[i].TertiaryColor,
                stadiumDetails: {
                    stadiumName: teamsData[i].StadiumDetails.Name,
                    stadiumCity: teamsData[i].StadiumDetails.City,
                    stadiumState: teamsData[i].StadiumDetails.State,
                    stadiumCountry: teamsData[i].StadiumDetails.Country,
                    capacity: teamsData[i].StadiumDetails.Capacity,
                    playingSurface: teamsData[i].StadiumDetails.PlayingSurface,
                    type: teamsData[i].StadiumDetails.Type,
                    geoLat: teamsData[i].StadiumDetails.GeoLat,
                    geoLong: teamsData[i].StadiumDetails.GeoLong,
                },
            };
            pushToDb.push(team);
        }
        await teamController.createMany(pushToDb);
        // close db when youre done
        mongoose.disconnect();
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
}

module.exports = {
    runEngine,
};