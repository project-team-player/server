const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        // sign the jwt and allow user access
        const bearerToken = jwt.sign(createdUser.toJSON(), process.env.SECRET, {
            expiresIn: '1day',
            issuer: process.env.ISSUER,
        });
        return res.status(201).json({ 
            message: 'User successfully created',
            token: `Bearer: ${bearerToken}`,
            user: userObj,
        });
    })
);

router.post(
    '/login',
    authSubroutines.loginFilled,
    catchErrors(async (req, res) => {
        // validation passed, find the user using email
        let user = await userController.readOne({ email: req.body.username });
        if(!user) {
            // that attempt didnt work, attempt to find it using the username
            user = await userController.readOne({ username: req.body.username });
        }
        if(!user) {
            // user doesnt exist
            const errorUser = new CustomError(400, 'Invalid Username: Try Again');
            return res.status(400).json({ errorUser });
        }
        const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
        if(!passwordsMatch) {
            const errorPassword = new CustomError(400, 'Invalid Password');
            return res.status(400).json({ errorPassword });
        }
        const userObj = user.toObject();
        delete userObj.password;
        // sign the jwt and allow user access
        const bearerToken = jwt.sign(user.toJSON(), process.env.SECRET, {
            expiresIn: '1day',
            issuer: process.env.ISSUER,
        });
        return res.status(201).json({
            message: 'Login Successful',
            token: `Bearer: ${bearerToken}`,
            user: userObj,
        });
    })
);

module.exports = router;



