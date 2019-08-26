/**
 * Awards weekly slices to users. 
 * Activates on :
 *  -> User creation
 *  -> Every close of the week.
 * Desirable to be AUTOMATATED WEEKLY.
 * Must know User Controller
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const userController = require('../controllers/user-controller');

const distributeSlices = async (dbName) => {
    // create db string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
        const controllerResult = await userController.updateMany({
            pizzaSlicesWeekly: 64,
        });
        // close db when youre done
        mongoose.disconnect();
        return controllerResult;
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    distributeSlices,
};