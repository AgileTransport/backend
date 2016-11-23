var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UpcomingSchema = new Schema({	'id' : String,	'line' : String,	'timestamp' : Date,	'arrival' : Number,	'timeUnit' : String,	'coordinates' : String});

module.exports = mongoose.model('Upcoming', UpcomingSchema);
