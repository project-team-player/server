const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportStrategy = require('./handlers/passport');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const routes = require('./routes/main');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/error-handlers');

// create Express APP
const app = express();

// view engine setup
// bunch of 'app.set' in here to refer to pug files on views folder

// Serves up static files from the public folder. 
// Anything in public will be served up to the file it is.
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // for CORS

// Exposes methods for validating data. 
app.use(expressValidator());

// Sessions allow storing data on visitors from request to request
// This keeps users logged in and allows sending flash messages.
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    // this might need MODS
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

// Passport JS will be used to handle user logins
app.use(passport.initialize());
app.use(passport.session()); // may need to be omitted
passport.use(passportStrategy);

// Flash middleware enables usage of req.flash('error', 'SHIT!'), which will then
// pass that message to the next page the user requests.
app.use(flash());

// Pass variables to templates + all requests
app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    res.locals.user = req.user || null;
    res.locals.currentPath = req.path;
    next();
});

// Handle own routes now
app.use('/', routes);

// If routes dont work, send 404 and forward to error handler
app.use(errorHandlers.notFound);

// One of the error handlers will see if these errors are just validation errors.
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a bad error
if(app.get('env') === 'development') {
    // development error handler - print stack trace
    app.use(errorHandlers.developmentErrors);
}

// production errorhandler
app.use(errorHandlers.productionErrors);

// export it
module.exports = app;
