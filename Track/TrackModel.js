var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TrackSchema = new Schema({	'id' : String,	'line' : String,	'route' : Number,	'nextStop' : Number,	'latitude' : Number,	'longitude' : Number,	'speed' : Number});

module.exports = mongoose.model('Track', TrackSchema);
