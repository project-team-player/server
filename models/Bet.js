/** Bet Model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const betSchema = new Schema({

});

betSchema.plugin(mongodbErrorHandler);

const Bet = mongoose.model('bet', betSchema);

module.exports = Bet;