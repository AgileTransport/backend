var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var LineStopSchema = new Schema({	'line' : String,	'route' : Number,	'stopSequence' : Number,	'stop' : Number});

module.exports = mongoose.model('LineStop', LineStopSchema);
