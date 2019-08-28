/**
 * MAIN ROUTER of the application. 
 * Reroutes to subrouters appropriately
 */
const express = require('express');
const publicRouter = require('./public-router');
const authRouter = require('./auth-router');
const gameRouter = require('./game-router');
const gamethreadRouter = require('./gamethread-router');
const betRouter = require('./bet-router');
const commentRouter = require('./comment-router');
const userRouter = require('./user-router');

const app = express();
app.use('/', publicRouter);
app.use('/authenticate', authRouter);
app.use('/games', gameRouter);
app.use('/gamethreads', gamethreadRouter);
app.use('/bets', betRouter);
app.use('/comments', commentRouter);
app.use('/users', userRouter);

module.exports = app;