/*League Model*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const leagueSchema = new Schema({
    name: String,
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    ]
    // TBD for more 
});

leagueSchema.plugin(mongodbErrorHandler);

const League = mongoose.model('league', leagueSchema);

module.exports = League;