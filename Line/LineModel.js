var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LineSchema = new Schema({
	'id' : String,
	'endOne' : String,
	'endTwo' : String,
	'type' : String
});

module.exports = mongoose.model('Line', LineSchema);
