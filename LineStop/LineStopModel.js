var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var LineStopSchema = new Schema({

module.exports = mongoose.model('LineStop', LineStopSchema);