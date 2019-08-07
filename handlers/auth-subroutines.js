const crypto = require('crypto'); // From node, turns text/tokens into cryptographs
const mail = require('./mail');

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
    req.flash('error', 'Passwords do not match');
    res.redirect('back');
};

// middleware to make sure username, 
// password and email fields arent empty
const usePassEmailFilled = (req, res, next) => {
    if(req.body.username && req.body.password && req.body.email) {
        return next();
    }
    req.flash('error', 'make sure username, password and email fields are filled');
    res.redirect('back');
}

module.exports = {
    isLoggedIn,
    confirmedPasswords,
    usePassEmailFilled,
};