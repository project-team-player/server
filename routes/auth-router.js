const router = require('express').Router();
const { catchErrors } = require('../handlers/error-handlers');
const userController = require('../controllers/user-controller');
const authSubroutines = require('../handlers/auth-subroutines');

router.post('/signup', 
    authSubroutines.usePassEmailFilled,
    authSubroutines.confirmedPasswords,
    catchErrors(async (req, res) => {
        // validators pass, move on.
        const user = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };
        const createdUser = await userController.createOne(user);
        const userObj = createdUser.toObject();
        delete userObj.password;
        // might need to delete _id frm userObj as well
        return res.status(201).json({ 
            message: 'User successfully created',
            user: userObj,
        });
    })
);

router.post(
    '/login',
    catchErrors((req, res) => {
        // TODO
    })
);

module.exports = router;



