const router = require('express').Router();
const { catchErrors } = require('../handlers/error-handlers');
const betController = require('../controllers/bet-controller');
const CustomError = require('../handlers/Custom-Error');