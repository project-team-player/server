const router = require('express').Router();
const passport = require('passport');
const { catchErrors } = require('../handlers/error-handlers');
const betController = require('../controllers/bet-controller');
const CustomError = require('../handlers/Custom-Error');

/**
 * AS OF 9/4/19: this route does the creates the comment 
 * Router that places bets, syncs to bet controller 'createOne()'
 * req.params.slug -> slug of the gamethread
 * req.body.slices -> number of slices to be betted 
 * req.body.teamId -> id of team bet on
 * req.body.key -> team key that the user is betting on
 * req.body.gamethreadId -> id of gamethread
 * req.body.comment -> comment associated with the bet
 * req.body.username -> username of the user
 * req.user -> the user
 */
router.post('/gamethread/:slug',
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res) => {
        if(req.body.slices && req.body.key) {
            const bet = await betController.createOne({
                owner: req.user._id,
                gameThreadReference: req.body.gamethreadId,
                teamReference: req.body.teamId,
                key: req.body.key,
                slug: req.params.slug,
                slicesBet: req.body.slices,
                isWin: false,
                comment: req.body.comment,
            });
            if(bet) {
                return res.status(201).json(bet);
            } else {
                const errorBet = new CustomError(400, 'Bet wasnt created.');
                return res.status(400).json({ errorBet });
            }
        } else {
            const errorReq = new CustomError(400, `'slices' and 'key' are required in req.body`);
            return res.status(400).json({ errorReq });
        }
    })
);

module.exports = router;