const router = require('express').Router();
const { catchErrors } = require('../handlers/error-handlers');
const userController = require('../controllers/user-controller');
const CustomError = require('../handlers/Custom-Error');