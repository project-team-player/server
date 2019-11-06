const router = require('express').Router();
const { catchErrors } = require('../handlers/error-handlers');
const teamController = require('../controllers/team-controller');

// route to get the team based off key
router.get('/:key',
    catchErrors(async(req, res) => {
        const team = await teamController.readOne({ key: req.params.key });
        return res.status(201).json({
            team
        });
    })
);

module.exports = router;