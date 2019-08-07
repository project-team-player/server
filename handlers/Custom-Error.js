/**
 * Custom Errors to be used in the application
 * @param {*} statusCode HTTP Status Codes
 * @param {*} params typical Error parameters (including Error.message)
 *
 */
class CustomError extends Error {
    constructor(statusCode = 500, ...params) {
        super(...params);
        // Maintains proper stack trace fow thrown error (V8 availability)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
  
        this.name = 'CustomError';
        // Custom debugging information
        this.statusCode = statusCode;
        this.date = new Date();
    }
}
  
module.exports = CustomError;
  