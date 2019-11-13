const router = require('express').Router();
const passport = require('passport');
const moment = require('moment');
const { catchErrors } = require('../handlers/error-handlers');
const commentController = require('../controllers/comment-controller');
const CustomError = require('../handlers/Custom-Error');
const Comment = require('../models/Comment');

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
// router.get('/all/gamethread/:id',
//     catchErrors(async(req, res) => {
//         const comments = await commentController.readMany({ 
//             gameThreadReference: req.params.id 
//         });
//         return res.status(200).json({ comments });
//     })
// );

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
                replies: [],
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

// Adds upvote to comment and removes downvote if existing
router.post('/:commentId/votes/up', 
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res, next) => {
        await commentController.updateVotes(req, res, { addVote: 'up', removeVote: 'down' })

        res.status(200).json({ successMessage: 'Succesfully added comment upvote', updatedComment: res.locals.comment });
    })
);

// Adds downvote to comment and removes upvote if existing
router.post('/:commentId/votes/down', 
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res) => {
        await commentController.updateVotes(req, res, { addVote: 'down', removeVote: 'up' })

        res.status(200).json({ successMessage: 'Succesfully added comment downvote', updatedComment: res.locals.comment });
    })
);

// Removes upvote from comment
router.delete('/:commentId/votes/up', 
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res) => {
        await commentController.updateVotes(req, res, { removeVote: 'up' })
  
        res.status(200).json({ successMessage: 'Succesfully removed upvote from comment', updatedComment: res.locals.comment });
    })
)

// Removes downvote from comment
router.delete('/:commentId/votes/down', 
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res) => {
        await commentController.updateVotes(req, res, { removeVote: 'down' });

        res.status(200).json({ successMessage: 'Succesfully removed downvote from comment', updatedComment: res.locals.comment });
    })
)

// ============ COMMENT REPLIES ================
// TODO: Move the replies to a replies router e.g. in dir /comments/replies-router.js 


/**
 * Make patch request to create a reply
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
        return res.status(201).json(reply);
    })
)

// Adds upvote to comment reply and removes downvote if existing
router.post('/:commentId/replies/:replyId/votes/up', 
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res, next) => {
        await commentController.updateVotes(req, res, { addVote: 'up', removeVote: 'down', isReply: true })

        res.status(200).json({ successMessage: 'Succesfully added comment upvote', updatedComment: res.locals.comment });
    })
);

// Adds downvote to comment reply and removes upvote if existing
router.post('/:commentId/replies/:replyId/votes/down', 
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res) => {
        await commentController.updateVotes(req, res, { addVote: 'down', removeVote: 'up', isReply: true, })

        res.status(200).json({ successMessage: 'Succesfully added comment downvote', updatedComment: res.locals.comment });
    })
);

// Removes upvote from comment reply
router.delete('/:commentId/replies/:replyId/votes/up', 
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res) => {
        await commentController.updateVotes(req, res, { removeVote: 'up', isReply: true })
  
        res.status(200).json({ successMessage: 'Succesfully removed upvote from comment', updatedComment: res.locals.comment });
    })
)

// Removes downvote from comment reply
router.delete('/:commentId/replies/:replyId/votes/down', 
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res) => {
        await commentController.updateVotes(req, res, { removeVote: 'down', isReply: true });

        res.status(200).json({ successMessage: 'Succesfully removed downvote from comment', updatedComment: res.locals.comment });
    })
)

module.exports = router;
