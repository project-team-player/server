/**
 * The bet resolver for every user. 
 * 1. Obtain all the bets in the database
 *      -> For each bet, check gamethread, check game reference, pull the winner. 
 *      -> IF the winner is the same as in the bet, user wins that bet.
 *      -> ELSE user loses the bet. 
 *      -> update that bet object's 'isWin' key.
 */