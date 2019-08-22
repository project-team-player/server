const router = require('express').Router();
const passport = require('passport');
const moment = require('moment');
const { catchErrors } = require('../handlers/error-handlers');
const commentController = require('../controllers/comment-controller');
const CustomError = require('../handlers/Custom-Error');

/**
 * Router that creates a single comment, syncs to comment 
 * controller's createOne() function.
 */
router.post('/add/gamethread/:id',  
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res) => {
        if(req.body.username && req.body.text) {
            const comment = await commentController.createOne({

            });
        } else {
            const errorReq = new CustomError(400, `'username' and 'text' are required`);
            return res.status(400).json({ errorReq });
        }
    })
);

module.exports = router;
