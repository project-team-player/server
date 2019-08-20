const router = require('express').Router();
const { catchErrors } = require('../handlers/error-handlers');
const betController = require('../controllers/bet-controller');
const CustomError = require('../handlers/Custom-Error');

/**
 * Router that places bets, syncs to bet controller 'createOne()'
 * req.params.id -> id of the gamethread
 * req.body.slices -> number of slices to be betted 
 * req.body.teamId -> ID team that the user is betting on
 * req.user -> the user
 */
router.post('/gamethread/:id',
    catchErrors(async(req, res) => {
        if(req.body.slices && req.body.teamId) {
            const bet = await betController.createOne({
                owner: {
                    ownerID: req.user.id.toString(),
                    objectReference: req.user.id,
                },
                gameThreadReference: req.params.id,
                team: req.body.teamId,
                slicesBet: req.body.slices,
                isWin: false,
            });
            if(bet) {
                return res.status(201).json({
                    message: `Bet Created on gamethread: ${bet.gameThreadReference.toString()}`,
                });
            } else {
                const errorBet = new CustomError(400, 'Bet wasnt created, check gamethread id or team id');
                return res.status(400).json({ errorBet });
            }
        } else {
            const errorReq = new CustomError(400, `'slices' and 'teamId' are required in req.body`);
            return res.status(400).json({ errorReq });
        }
    })
);

module.exports = router;