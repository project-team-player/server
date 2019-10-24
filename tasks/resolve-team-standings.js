/**
 * Calls the standings ingestion engine to update the team standings
 * each week. 
 * Each team in the DB has following fields:
 *  -> key
 *  -> wins
 *  -> losses
 * Each team pulled from the ingestion engine has corresponding fields:
 *  -> Team
 *  -> Wins
 *  -> Losses
 *  -> Ties
 */