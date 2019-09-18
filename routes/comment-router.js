const router = require('express').Router();
const passport = require('passport');
const moment = require('moment');
const { catchErrors } = require('../handlers/error-handlers');
const commentController = require('../controllers/comment-controller');
const CustomError = require('../handlers/Custom-Error');


/**
 * Router that gets all the comments of a gamethread
 * req.params.id -> id of the gamethread containing comments
 */
router.get('/all/gamethread/:id',
    catchErrors(async(req, res) => {
        const comments = await commentController.readWithBets({ 
            gameThreadReference: req.params.id 
        });
        return res.status(200).json({ comments });
    })
);

/**
 * Router that creates a single ROOT comment, syncs to comment 
 * controller's createOne() function.
 * req.params.slug -> slug of the gamethread
 * req.body.username -> owner of the comment
 * req.body.text -> text of the comment
 * req.body.gamethreadId -> ID of the game thread
 * req.user -> the user
 */
router.post('/gamethread/:slug',  
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res) => {
        if(req.body.username && req.body.text) {
            const comment = await commentController.createOne({
                owner: req.body.username,
                ownerObj: req.user._id,
                gravatar: req.user.gravatar,
                text: req.body.text,
                createdAt: `${moment()}`,
                isRootComment: true,
                comments: [],
                gameThreadReference: req.body.gamethreadId,
                slug: req.params.slug,
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

/**
 * Make patch request
 * Needs: Comment ID
 * req.params.id (id is the comment id)
 */

router.patch('/reply/:id', 
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res) => {
        const comment = await commentController.readOne({_id:req.params.id});
        const replies = comment.replies || [];
        const reply = {
            username: req.body.username,
            gravatar: req.body.gravatar,
            text: req.body.text,
            createdAt: `${moment()}`
        }
        replies.push(reply);
        await commentController.updateOne(comment._id, {
            replies: replies
        });
    })
)

module.exports = router;
