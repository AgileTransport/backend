var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var StopSchema = new Schema({

module.exports = mongoose.model('Stop', StopSchema);