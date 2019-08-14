/** Game Model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const gameSchema = new Schema({

});

gameSchema.plugin(mongodbErrorHandler);

const Game = mongoose.model('game', gameSchema);

module.exports = Game;