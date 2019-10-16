/**
 * Score Write -> Writes the scores in a given game.
 * Different 3rd party API. Actual scores are written.
 * Limited to 25 calls per day. 
 * Options on how to match score with a game:
 * 1. Obtain home and away teams (awayTeam.key and homeTeam.key) 
 *  -> match with data.data.events[i].teams_normalized[0].abbreviation (away)
 *      and data.data.events[i].teams_normalized[1].abbreviation (home)
 * This then gets called by a task program in the task folder.
 */