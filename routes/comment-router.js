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
        return res.status(201).json(reply);
    })
)

/**
 * Upvote, downvote or remove votes made by current user on a selected comment.
 * @param {String} req.user.username username is automatically derived from jwt token
 * @param {String} [req.query.upvote] add this upvote query param to upvote comment
 * @param {String} [req.query.downVote] add this downVote query param to downvote comment
 * @param {String} [req.query.removeVote] Add this removeVote query param to remove all likes/dislikes that current user has made on comment
 * @param {String} req.params.commentId Id of comment that needs to be voted on
 */
router.patch('/:commentId/vote', 
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res, next) => {
        const { username } = req.user;
        const { upVote, downVote, removeVote } = req.query;
        const { commentId } = req.params;
        // If username is missing in req.body
        if (!username) res.status(400).json('Error: Please provide a username');

        // Get comment from commentId
        const comment = await commentController.readOne({ _id: commentId })

        // Make a shallow copy of comment for mutation
        const commentVotes = { ...comment.votes };
        const { dislikes: { count: dislikesCount, users: userDislikes }, likes: { count: likesCount, users: userLikes}} = commentVotes;

        // Set default response in case query params are missing
        let response = { code: 400, message: "Please provide valid query params and you can't vote twice" };

        const addLike = () => {
            commentVotes.likes.count = likesCount + 1;
            commentVotes.likes.users[username] = true;
            response = { code: 201, message: 'Comment succesfully liked!' };
        }

        const addDislike = () => {
            commentVotes.dislikes.count = dislikesCount + 1;
            commentVotes.dislikes.users[username] = true;
            response = { code: 201, message: 'Comment succesfully disliked!' };
        }

        const removeLike = () => {
            commentVotes.likes.count = likesCount - 1;
            delete commentVotes.likes.users[username];
            response = { code: 201, message: 'Comment like succesfully removed!' };
        }

        const removeDislike = () => {
            commentVotes.dislikes.count = dislikesCount - 1;
            delete commentVotes.dislikes.users[username];
            response = { code: 201, message: 'Comment dislike succesfully removed!' };
        }

        // Check wheter to upvote, downvote or remove vote based on query params
        if (upVote === 'true') {
            if (userLikes[username]) return res.status(409).json(('Error: User has already liked this comment'));
            if (userDislikes[username]) return res.status(409).json(('Error: User has already disliked this comment'));
            addLike();
        } else if (downVote === 'true') {
            if (userDislikes[username]) res.status(409).json(('Error: User has already disliked this comment'));
            else if (userLikes[username]) res.status(409).json(('Error: User has already liked this comment'));
            else addDislike();
        } else if (removeVote === 'true') {
            if (userLikes[username]) removeLike();
            else if (userDislikes[username]) removeDislike();
            else response = { code: 409, message: 'Error: This user has not made any dislikes or likes for comment' }
        }

        if (response !== 400) {
            // Make DB update to votes
            await commentController.updateOne(commentId, { votes: commentVotes });
        }
        // Send response to client
        return res.status(response.code).json(response.message);
    })
);

module.exports = router;
