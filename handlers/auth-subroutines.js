const crypto = require('crypto'); // From node, turns text/tokens into cryptographs
const mail = require('./mail');
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
    res.status(400).json({ error });
};

// middleware to make sure username, 
// password and email fields arent empty
const usePassEmailFilled = (req, res, next) => {
    if(req.body.name && req.body.username && req.body.password && req.body.email) {
        return next();
    }
    const error =  new CustomError(400, 'Invalid Signup: Missing either name, username, password, email');
    res.status(400).json({ error });
};

module.exports = {
    isLoggedIn,
    confirmedPasswords,
    usePassEmailFilled,
};