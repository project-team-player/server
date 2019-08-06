/**
 * Interface strategy to check if user is allowed to perform functions.
 * Local strategies will be used for such.
 */
const passport = require('passport');
const crypto = require('crypto'); // From node, turns text/tokens into cryptographs
const mongoose = require('mongoose');
const User = require('../models/User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');