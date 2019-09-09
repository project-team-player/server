const router = require('express').Router();
const { catchErrors } = require('../handlers/error-handlers');
const gamethreadController = require('../controllers/gamethread-controller');
const CustomError = require('../handlers/Custom-Error');
const sauceCalculator = require('../handlers/sauce-calculator');

const MAX_WEEK_REG = 17;
const MIN_WEEK_REG = 1;

// route to get all gamethreads based off week
router.get('/week/:week',
    catchErrors(async(req, res) => {
        if(req.params.week >= MIN_WEEK_REG && req.params.week <= MAX_WEEK_REG) {
            const gamethreads = await gamethreadController.readMany({ week: req.params.week });
            return res.status(201).json({
                message: `Week ${req.params.week} gamethreads`,
                gamethreads,
            });
        } else {
            const errorWeek = new CustomError(400, 'Invalid week, enter a week from 1 - 17');
            return res.status(400).json({ errorWeek });
        }
    })
);  

// route to get gamethread based off game
router.get('/:id',
    catchErrors(async(req, res) => {
        const gamethread = await gamethreadController.readOne({ _id: req.params.id });
        // call sauce calculator
        const percentages = await sauceCalculator.teamPercentages(gamethread);
        if(gamethread) {
            return res.status(201).json({ 
                gamethread,
                percentages,
            });
        } else {
            const errorID = new CustomError(400, 'No gamethread found based off that id');
            return res.status(400).json({ errorID });
        }
    })
);

module.exports = router;
