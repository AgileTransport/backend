var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var LineSchema = new Schema({

module.exports = mongoose.model('Line', LineSchema);