const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const userController = require('../controllers/user-controller');

// Mirrors test DB just users
const runMirror = async () => {
    try {
        const copyFromDB = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${process.env.DB_TEST}${process.env.DB_CONN_STR4}`;
        const copyToDB = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${process.env.DB_FUDGE}${process.env.DB_CONN_STR4}`;
        await mongoose.connect(copyFromDB); 
        mongoose.Promise = global.Promise;
        const allUsers = await userController.readMany({});
        await mongoose.disconnect();
        await mongoose.connect(copyToDB);
        await userController.createMany(allUsers);
        await mongoose.disconnect();
    } catch(err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    runMirror,
};