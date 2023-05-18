const createTeam = (team) => {
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

    const query = `INSERT INTO TEAMS (
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
}

const readTeam = (team) => {
    const query = `SELECT * FROM TEAMS
        WHERE id = ${team.id}
        RETURNING *`
}

const updateTeam = (team) => {
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
    const query = `UPDATE TEAMS
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
}

const deleteTeam = (team) => {
    const query = `DELETE FROM TEAMS
    WHERE id = ${team.id} `
}

module.exports = {
    createTeam,
    readTeam,
    updateTeam,
    deleteTeam
};