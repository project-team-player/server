const router = require('express').Router();
const { catchErrors } = require('../handlers/error-handlers');
const userController = require('../controllers/user-controller');
const authSubroutines = require('../handlers/auth-subroutines');

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



