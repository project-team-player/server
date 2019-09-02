/**
 * Assign a 'pizzaSlicesWonWeek' field to all users.
 * Set it to '0'. 
 * AS of 9/2/19, only test and development DBs have users
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const userController = require('../controllers/user-controller');

const distributeSlices = async (dbName) => {
    // create DB string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
        const result = await userController.updateMany({
            pizzaSlicesWonWeek: 0,
        });
        mongoose.disconnect();
        return result;
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

distributeSlices(process.argv[2]);

module.exports = {
    distributeSlices,
};