/**
 * Catch Errors in here
 */

 /**
  * ASYNC/AWAIT WRAPPER
  */
const catchErrors = (fn) => {
    return function(req, res, next) {
        return fn(req, res, next).catch(next);
    };
};

/**
 * NOT FOUND error handler
 * If a route not found is hit , mark 404 and pass it along to next error handler
 */
const notFound = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};

/**
 * MongoDB validation error
 * Detects mongodb validation errors to show flash messages
 */
const flashValidationErrors = (err, req, res, next) => {
    if(!err.errors) return next(err);
    // validation errors look like
    const errorKeys = Object.keys(err.errors);
    errorKeys.forEach(key => req.flash('error', err.errors[key].message));
    res.redirect('back');
};

/**
 * Development Error Handler
 * Show good error messages in development
 */
const developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status,
        stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
    };
    res.status(err.status || 500);
    res.format({
        // based on 'Accept' http header
        'text/html': () => {
            res.sender('error', errorDetails);
        }, // Form submit, reload
        'application/json': () => res.json(errorDetails), // AJAX CALL, send JSON back
    });
};

/**
 * Production Error Handler
 * No stack trace
 */
const productionErrors = (err, req, res, next) => {
    res.status(err.status || 500);
    // TODO: 
    // render here when pug files are set up
};

module.exports = {
    catchErrors,
    asyncWrapper,
    notFound,
    flashValidationErrors,
    developmentErrors,
    productionErrors,
};


