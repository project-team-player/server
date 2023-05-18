const { executeQuery } = require('./postgres');

const createTeam = async (team) => {
    [
        fullName,
        key,
        placeName,
        teamName,
        conference,
        division,
        byeWeek,
        headCoach,
        offensiveCoordinator,
        defensiveCoordinator,
        specialTeamsCoach,
        wikiLogoURL,
        wikiWordMarkURL,
        primaryColor,
        secondaryColor,
        tertiaryColor,
        stadiumDetails
    ] = [...team]

    const query = `INSERT INTO teams (
        fullName,
        key,
        placeName,
        teamName,
        conference,
        division,
        byeWeek,
        headCoach,
        offensiveCoordinator,
        defensiveCoordinator,
        specialTeamsCoach,
        wikiLogoURL,
        wikiWordMarkURL,
        primaryColor,
        secondaryColor,
        tertiaryColor,
        stadiumDetails
    ) VALUES (
        ${fullName},
        ${key},
        ${placeName},
        ${teamName},
        ${conference},
        ${division},
        ${byeWeek},
        ${headCoach},
        ${offensiveCoordinator},
        ${defensiveCoordinator},
        ${specialTeamsCoach},
        ${wikiLogoURL},
        ${wikiWordMarkURL},
        ${primaryColor},
        ${secondaryColor},
        ${tertiaryColor},
        ${stadiumDetails}
    ) RETURNING *`
    const result = await executeQuery(query);
    return result;
}

const readTeam = async (team) => {
    const query = `SELECT * FROM teams
        WHERE id = ${team.id}
        RETURNING *`
    const result = await executeQuery(query);
    return result;
}

const updateTeam = async (team) => {
    [
        fullName,
        key,
        placeName,
        teamName,
        conference,
        division,
        byeWeek,
        headCoach,
        offensiveCoordinator,
        defensiveCoordinator,
        specialTeamsCoach,
        wikiLogoURL,
        wikiWordMarkURL,
        primaryColor,
        secondaryColor,
        tertiaryColor,
        stadiumDetails
    ] = [...team]
    const query = `UPDATE teams
        SET fullName = ${fullName}.
            key = ${key},
            placeName = ${placeName},
            teamName = ${teamName},
            conference = ${conference},
            division = ${division},
            byeWeek = ${byeWeek},
            headCoach = ${headCoach},
            offensiveCoordinator = ${offensiveCoordinator},
            defensiveCoordinator = ${defensiveCoordinator},
            specialTeamsCoach = ${specialTeamsCoach},
            wikiLogoURL = ${wikiLogoURL},
            wikiWordMarkURL = ${wikiWordMarkURL},
            primaryColor = ${primaryColor},
            secondaryColor = ${secondaryColor},
            tertiaryColor = ${tertiaryColor},
            stadiumDetails = ${stadiumDetails}
        WHERE id = ${team.id}
        RETURNING *`
    const result = await executeQuery(query);
    return result;
}

const deleteTeam = async (team) => {
    const query = `DELETE FROM teams
    WHERE id = ${team.id} `
    const result = await executeQuery(query);
    return result;
}

const createTeamTable = async () => {
    const query = `CREATE TABLE teams (
        id varchar PRIMARY KEY,
        fullName varchar,
        key varchar,
        placeName varchar,
        teamName varchar,
        conference varchar,
        division varchar,
        byeWeek int,
        headCoach varchar,
        offensiveCoordinator varchar,
        defensiveCoordinator varchar,
        specialTeamsCoach varchar
        wikiLogoURL varchar,
        wikiWordMarkURL varchar,
        primaryColor varchar,
        secondaryColor varchar,
        tertiaryColor varchar,
        stadiumDetails varchar
    )`
    const result = await executeQuery(query);
    return result;
}

module.exports = {
    createTeam,
    readTeam,
    updateTeam,
    deleteTeam,
    createTeamTable
};