var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LineTimetableSchema = new Schema({
	'line' : String,
	'route' : Number,
	'time' : String
});

module.exports = mongoose.model('LineTimetable', LineTimetableSchema);
