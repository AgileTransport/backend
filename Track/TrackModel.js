var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TrackSchema = new Schema({

module.exports = mongoose.model('Track', TrackSchema);