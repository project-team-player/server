const router = require('express').Router();
const { catchErrors } = require('../handlers/error-handlers');
const betController = require('../controllers/bet-controller');
const CustomError = require('../handlers/Custom-Error');

/**
 * Router that places bets, syncs to bet controller 'createOne()'
 * req.query.id -> id of the gamethread
 * req.body.slices -> number of slices to be betted 
 * req.body.team -> team that the user is betting on
 */
router.post('/gamethread/:id',
    catchErrors(async(req, res) => {
        
    })
);

module.exports = router;