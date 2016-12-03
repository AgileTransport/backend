var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ArrivalSchema = new Schema({	'id' : String,	'line' : String,	'estimatedTime' : Number,	'unit' : String});

module.exports = mongoose.model('Arrival', ArrivalSchema);
