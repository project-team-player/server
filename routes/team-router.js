const router = require('express').Router();
const { catchErrors } = require('../handlers/error-handlers');
const teamController = require('../controllers/team-controller');

// route to get the team based off id
router.get('/:id',
    catchErrors(async(req, res) => {
        const team = await teamController.readOne({ _id: req.params.id });
        return res.status(201).json({
            team
        });
    })
);

module.exports = router;