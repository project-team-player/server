/**
 * MAIN ROUTER of the application. 
 * Reroutes to subrouters appropriately
 */
const express = require('express');
const publicRouter = require('./public-router');

const app = express();
app.use('/', publicRouter);

module.exports = app;