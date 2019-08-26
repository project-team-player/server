/**
 * Awards weekly slices to users. 
 * Activates on :
 *  -> User creation
 *  -> Every close of the week.
 * Desirable to be AUTOMATATED WEEKLY.
 * Must know User Controller
 */
const userController = require('../controllers/user-controller');

const distributeSlices = async (dbName) => {
    console.log(dbName);
    const controllerResult = await userController.updateMany({
        pizzaSlicesWeekly: 64,
    });
    return controllerResult;
};

module.exports = {
    distributeSlices,
};