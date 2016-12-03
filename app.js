var express = require('express');
var app = express();

var mongoose = require('mongoose');
// Use native Node promises.
mongoose.Promise = global.Promise;

// Connect to MongoDB.
mongoose.connect('mongodb://localhost/agile-transport')
  .then(() =>  console.log('Connected to MongoDB.'))
  .catch((err) => console.error(err));

// Set up the APIs.
var arrivals = require('./Arrival/ArrivalRoutes');
app.use('/arrivals', arrivals);

var track = require('./Track/TrackRoutes');
app.use('/track', track);

var lines = require('./Line/LineRoutes');
app.use('/lines', lines);

var stops = require('./Stop/StopRoutes');
app.use('/stops', stops);

var linestops = require('./LineStop/LineStopRoutes');
app.use('/linestops', linestops);

var timetable = require('./LineTimetable/LineTimetableRoutes');
app.use('/timetable', timetable);

// Start listening for requests.
app.listen(80, function () {
  console.log('Listening on port 80!');
});
