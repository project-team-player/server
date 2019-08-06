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

/**
 * 'local' puts the user object on each request.
 * serializeUser() and desirializeUser() used on '../handlers/passport'
 * utilized for passing this user info.
 */
const login = passport.authenticate('local', {
    failureRedirect: '/login', // redirect to 'login'
    failureFlash: 'Failed Login!',
    successRedirect: '/',
    successFlash: 'Youre Logged In', 
});

const logout = (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/');
};

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

module.exports = {
    login,
    logout,
    isLoggedIn,
    confirmedPasswords,
};