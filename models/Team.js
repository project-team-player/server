/** Team Model */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const teamSchema = new teamSchema({
    fullName: String,
    key: String,
});

teamSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Team', teamSchema);