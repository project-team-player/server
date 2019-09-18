/**
 * Model for a weekly leader board
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const boardSchema = new Schema({

});

boardSchema.plugin(mongodbErrorHandler);

const Board = mongoose.model('board', boardSchema);

module.exports = Board;