const router = require('express').Router();
const passport = require('passport');
const { catchErrors } = require('../handlers/error-handlers');
const betController = require('../controllers/bet-controller');
const CustomError = require('../handlers/Custom-Error');

/**
 * Router that places bets, syncs to bet controller 'createOne()'
 * req.params.id -> id of the gamethread
 * req.body.slices -> number of slices to be betted 
 * req.body.teamId -> id of team bet on
 * req.body.key -> team key that the user is betting on
 * req.body.slug -> slug of the game thread 
 * req.user -> the user
 */
router.post('/add/gamethread/:id',
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res) => {
        if(req.body.slices && req.body.key) {
            const bet = await betController.createOne({
                owner: req.user._id,
                gameThreadReference: req.params.id,
                team: req.body.teamId,
                key: req.body.key,
                slug: req.body.slug,
                slicesBet: req.body.slices,
                isWin: false,
            });
            if(bet) {
                return res.status(201).json({ bet });
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