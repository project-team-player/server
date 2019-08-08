const router = require('express').Router();
const { catchErrors } = require('../handlers/error-handlers');
const userController = require('../controllers/user-controller');
const authSubroutines = require('../handlers/auth-subroutines');
const CustomError = require('../handlers/Custom-Error');

router.post('/signup', 
    authSubroutines.usePassEmailFilled,
    authSubroutines.confirmedPasswords,
    catchErrors(async (req, res) => {
        const existingUser = await userController.readOne({ email: req.body.email });
        if(existingUser) {
            const errorEmailExists = new CustomError(400, 'That email address has already been registered');
            return res.status(400).json({ errorEmailExists });
        }
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



