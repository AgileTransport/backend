var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var StopSchema = new Schema({	'id' : Number,	'name' : String,	'latitude' : Number,	'longitude' : Number});

module.exports = mongoose.model('Stop', StopSchema);
