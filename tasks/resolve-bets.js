/**
 * The bet resolver for every user. 
 * 1. Obtain all the users in the database
 * 2. Check every user's bets array. 
 *      -> For each bet, check gamethread, check game reference, pull the winner. 
 *      -> IF the winner is the same as in the bet, user wins that bet.
 *      -> ELSE user loses the bet. 
 */