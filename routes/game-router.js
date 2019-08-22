const router = require('express').Router();
const { catchErrors } = require('../handlers/error-handlers');
const gameController = require('../controllers/game-controller');
const gameReduce = require('../handlers/game-reduce');
const CustomError = require('../handlers/Custom-Error');

const MAX_WEEK_REG = 17;
const MIN_WEEK_REG = 1;

// route to get all games based off week
router.get('/week/:week',
    catchErrors(async(req, res) => {
        if(req.params.week >= MIN_WEEK_REG && req.params.week <= MAX_WEEK_REG) {
            const games = await gameController.readMany({ week: req.params.week });
            const gamesList = gameReduce.trimData(games);
            return res.status(201).json({
                message: `Week ${req.params.week} games`,
                gamesList,
            });
        } else {
            const errorWeek = new CustomError(400, 'Invalid week, enter a week from 1 - 17');
            return res.status(400).json({ errorWeek });
        }
    })
);

// route to get an INT of total weeks: per Jonathan's request
router.get('/weekTotal/NFL', (req, res) => {
    return res.status(201).json({
        totalWeeksNFL: MAX_WEEK_REG,
    });
});

module.exports = router;