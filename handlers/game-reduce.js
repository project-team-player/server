/**
 * Reduces the game 
 * to its bear essentials
 * TRIM THAT BUSH!!!
 * takes an array of untrimmed games
 * returns an array of trimmed games
 */

 const trimData = (gameArray) => {
    const trimmedGames = [];
    for (let i = 0; i < gameArray.length; ++i) {
        const game = {  
            isFinished: gameArray[i].isFinished,
            _id: gameArray[i]._id,
            week: gameArray[i].week,
            slug: gameArray[i].slug,
            awayTeam: {
                key: gameArray[i].awayTeam.key,
                awayID: gameArray[i].awayTeam.awayID,
                logo: gameArray[i].awayTeam.logo,
                name: gameArray[i].awayTeam.name,
                primaryColor: gameArray[i].awayTeam.primaryColor,
                secondaryColor: gameArray[i].awayTeam.secondaryColor,
            },
            homeTeam: {
                key: gameArray[i].homeTeam.key,
                homeID: gameArray[i].homeTeam.homeID,
                logo: gameArray[i].homeTeam.logo,
                name: gameArray[i].homeTeam.name,
                primaryColor: gameArray[i].homeTeam.primaryColor,
                secondaryColor: gameArray[i].homeTeam.secondaryColor,
            },
            awayScore: gameArray[i].awayScore,
            homeScore: gameArray[i].homeScore,
            date: gameArray[i].date,
            dateTime: gameArray[i].dateTime,
            gameThreadReference: gameArray[i].gameThreadReference,
        }
        trimmedGames.push(game);
    }
    return trimmedGames;
 };

 module.exports = {
     trimData,
 };