const router = require('express').Router();
const { catchErrors } = require('../handlers/error-handlers');
const userController = require('../controllers/user-controller');
const authController = require('../controllers/auth-subroutines');

router.post(
    '/signup', 
    catchErrors((req, res) => {
        // TODO
    })
);

router.post(
    '/login',
    catchErrors((req, res) => {
        // TODO
    })
);



