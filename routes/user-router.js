const router = require('express').Router();
const passport = require('passport');
const { catchErrors } = require('../handlers/error-handlers');
const userController = require('../controllers/user-controller');
const CustomError = require('../handlers/Custom-Error');

// route that reads all bets from the P.O.V. of the user.
router.get('/bets',
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res) => {
        
    })
);

module.exports = router;