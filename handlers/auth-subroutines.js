const crypto = require('crypto'); // From node, turns text/tokens into cryptographs
const mail = require('./mail');
const validator = require('validator');
const CustomError = require('./Custom-Error');

// User this middleware to protect pages from being
// used by unauthenticated users/sessions.
const isLoggedIn = (req, res, next) => {
    // 1st check the user is authenticated, check w/passport
    if(req.isAuthenticated()) {
        return next(); // allow authenticated user access
    }
    req.flash('error', 'Must be logged in to perform these');
    res.redirect('/login');
};

// middleware for password confirmation
const confirmedPasswords = (req, res, next) => {
    // square brackets to access req.body and it may or may not be camelcase
    if(req.body.password === req.body['passwordConfirm']) {
        return next();
    }
    const error = new CustomError(400, 'Invalid Signup: Passwords do not match');
    return res.status(400).json({ error });
};

// middleware to make sure name, username, 
// password and email fields arent empty
const usePassEmailFilled = (req, res, next) => {
    if(!validator.isEmail(req.body.email)) {
        const errorEmail = new CustomError(400, 'Invalid Email Format');
        return res.status(400).json({ errorEmail });
    }
    if(req.body.username && req.body.password && req.body.email) {
        return next();
    }
    const errorValidate =  new CustomError(400, 'Invalid Signup: Missing either username, password, email');
    return res.status(400).json({ errorValidate });
};

/**
 * When logging in:
 * 1. Make sure username and password fields are filled (validation needed).
 * 2. username can be user's email or user's username
 */

 // middlware to make sure the login form isnt empty
const loginFilled = (req, res, next) => {
    if(req.body.username && req.body.password) {
        return next();
    }
    const errorLogin = new CustomError(400, 'Username or/and Password is required');
    return res.status(400).json({ errorLogin });
};

module.exports = {
    isLoggedIn,
    confirmedPasswords,
    usePassEmailFilled,
    loginFilled,
};