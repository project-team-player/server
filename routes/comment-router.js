const router = require('express').Router();
const passport = require('passport');
const moment = require('moment');
const { catchErrors } = require('../handlers/error-handlers');
const commentController = require('../controllers/comment-controller');
const CustomError = require('../handlers/Custom-Error');

/**
 * Router that creates a single ROOT comment, syncs to comment 
 * controller's createOne() function.
 * req.params.id -> id of the gamethread
 * req.body.username -> owner of the comment
 * req.body.text -> text of the comment
 * req.body.slug -> slug of the game thread
 * req.user -> the user
 */
router.post('/add/gamethread/:id',  
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res) => {
        if(req.body.username && req.body.text) {
            const comment = await commentController.createOne({
                owner: req.body.username,
                ownerObj: req.user._id,
                text: req.body.text,
                createdAt: `${moment()}`,
                isRootComment: true,
                comments: [],
                gameThreadReference: req.params.id,
                slug: req.body.slug,
            });
            if(comment) {
                return res.status(201).json(comment);
            } else {
                const errorComment = new CustomError(400, 'Comment wasnt created.');
                return res.status(400).json({ errorComment });
            }
        } else {
            const errorReq = new CustomError(400, `'username' and 'text' are required`);
            return res.status(400).json({ errorReq });
        }
    })
);

module.exports = router;
