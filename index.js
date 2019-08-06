const mongoose = require('mongoose');

// import environmental variables from .env file
require('dotenv').config({ path: '.env' });

// Connect to Database and handle bad connections
mongoose.connect(process.env.DATABASE_CONNECTION);
mongoose.Promise = global.Promise; // Mongoose will use ES6 Promises
mongoose.connection.on('error', (err)=> {
    console.error(`💩💩💩💩 🔎 ${err.message}`);
});

// Start the app
const app = require('./app');
app.set('port', process.env.PORT || 5900);
const server= app.listen(app.get('port'), () => {
    console.log(`Pecorina Running at PORT ${server.address().port}`);
});