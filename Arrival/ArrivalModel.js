var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ArrivalSchema = new Schema({

module.exports = mongoose.model('Arrival', ArrivalSchema);