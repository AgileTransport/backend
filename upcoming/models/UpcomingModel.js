var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UpcomingSchema = new Schema({

module.exports = mongoose.model('Upcoming', UpcomingSchema);