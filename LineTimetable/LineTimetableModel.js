var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var LineTimetableSchema = new Schema({

module.exports = mongoose.model('LineTimetable', LineTimetableSchema);