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

StopModel = require('./Stop/StopModel');
LineStopModel = require('./LineStop/LineStopModel');
LineTimetableModel = require('./LineTimetable/LineTimetableModel');

global.linesToSimulate = [{ line: "25", route: 1 }];
global.linesTracked = new Map();
global.nextStops = new Map();
global.stops = [];

function simulation(input) {
    function task() {
        //console.log(input.nextStops);

        // Update tracked lines.
        input.linesTracked.forEach(function (lineDetails, key) {
            var now = new Date();
            var secondsPassed = (now.getTime() - lineDetails.previousTime.getTime()) / 1000;
            lineDetails.currentDistance += secondsPassed * (300 / 36);
            lineDetails.previousTime = now;
            lineDetails.detailedLineStops.lineStops.forEach(function (lineStop) {
                if (lineDetails.currentDistance <= lineStop.totalLength) {
                    if (input.nextStops.has(lineStop.stop)) {
                        if (input.nextStops.get(lineStop.stop).has(lineDetails.line + "_" + lineDetails.route + "_" + lineDetails.startTime)) {
                            var stopLineDetail = input.nextStops.get(lineStop.stop).get(lineDetails.line + "_" + lineDetails.route + "_" + lineDetails.startTime);
                            stopLineDetail.timeNeeded = (lineStop.totalLength - lineDetails.currentDistance) * 36 / 300 / 60;
                            //console.log("Stop remaining for " + lineDetails.line + " (" + lineDetails.route + ", " + lineDetails.startTime
                            //  + ") in " + stopLineDetail.timeNeeded + " at " + lineStop.stop);
                        }
                    }
                    else {
                        var map = new Map();
                        var initialStopLine = {
                            timeNeeded: (lineStop.totalLength - lineDetails.currentDistance) * 36 / 300 / 60,
                            lineFull: lineDetails.line + " (" + lineDetails.startTime + ")"
                        };
                        map.set(lineDetails.line + "_" + lineDetails.route + "_" + lineDetails.startTime, initialStopLine);
                        input.nextStops.set(lineStop.stop, map);
                        //console.log("(init) Stop remaining for " + lineDetails.line + " (" + lineDetails.route + ", " + lineDetails.startTime
                        //  + ") in " + initialStopLine.timeNeeded + " at " + lineStop.stop);
                    }
                }
                else {
                    if (input.nextStops.has(lineStop.stop)) {
                        if (input.nextStops.get(lineStop.stop).has(lineDetails.line + "_" + lineDetails.route + "_" + lineDetails.startTime)) {
                            input.nextStops.get(lineStop.stop).delete(lineDetails.line + "_" + lineDetails.route + "_" + lineDetails.startTime);
                        }
                    }
                }
            });

            if (lineDetails.detailedLineStops.totalLength <= lineDetails.currentDistance) {
                input.linesTracked.delete(key);
            }
        });

        // Add new lines to track.
        input.timetables.forEach(function (timetable) {
            var now = new Date();
            if (timetable.endOneRealStart && timetable.endOneRealStart.getTime() < now.getTime() && now.getTime() < timetable.endOneEstimatedEnd.getTime()) {
                var lineToTrackOne = null;
                for (let value of input.lineStops.keys()) {
                    if (value.line == timetable.line) {
                        lineToTrackOne = input.lineStops.get(value);
                        break;
                    }
                }

                if (lineToTrackOne) {
                    var secondsPassed = (now.getTime() - timetable.endOneRealStart.getTime()) / 1000;
                    var trackOne = {
                        previousTime: now,
                        currentDistance: secondsPassed * (300 / 36),
                        detailedLineStops: {
                            lineStops: lineToTrackOne
                        },
                        line: timetable.line,
                        route: 1,
                        startTime: timetable.endOne
                    };
                    if (!input.linesTracked.has(trackOne.line + "_" + trackOne.route + "_" + trackOne.startTime)) {
                        input.linesTracked.set(trackOne.line + "_" + trackOne.route + "_" + trackOne.startTime, trackOne);
                        //console.log("Start " + trackOne.line + " (" + trackOne.route + ", " + trackOne.startTime + ")");
                    }
                }
            }
            if (timetable.endTwoRealStart && timetable.endTwoRealStart.getTime() < now.getTime() && now.getTime() <  timetable.endTwoEstimatedEnd.getTime()) {
                var lineToTrackTwo = null;
                for (let value of input.lineStops.keys()) {
                    if (value.line == timetable.line) {
                        lineToTrackTwo = input.lineStops.get(value);
                        break;
                    }
                }

                if (lineToTrackTwo) {
                    var secondsPassed = (now.getTime() - timetable.endTwoRealStart.getTime()) / 1000;
                    var trackTwo = {
                        previousTime: now,
                        currentDistance: secondsPassed * (300 / 36),
                        detailedLineStops: {
                            lineStops: lineToTrackTwo
                        },
                        line: timetable.line,
                        route: 2,
                        startTime: timetable.endTwo
                    };
                    if (!input.linesTracked.has(trackTwo.line + "_" + trackTwo.route + "_" + trackTwo.startTime)) {
                        input.linesTracked.set(trackTwo.line + "_" + trackTwo.route + "_" + trackTwo.startTime, trackTwo);
                        //console.log("Start " + trackTwo.line + " (" + trackTwo.route + ", " + trackTwo.startTime + ")");
                    }
                }
            }
        });
    }

    setInterval(task, 500);
};

var stopsPromise = StopModel.find().exec();
stopsPromise.then(stops => {
    stops.forEach(oldStop => {
        var newOldStop = JSON.parse(JSON.stringify(oldStop));
        global.stops.push({
            id: newOldStop.id,
            latitude: parseFloat(newOldStop.latitude),
            longitude: parseFloat(newOldStop.longitude)
        });
    });

    console.log(global.stops);
}).catch(reason => {
    console.log(reason);
});

function prepareSimulation(global) {
    console.log("Preparing the simulation.");
    var lineStopsPromise = LineStopModel.find().exec();
    lineStopsPromise.then(lineStops => {
        var detailedLineStops = new Map();

        global.linesToSimulate.forEach(lineToSimulate => {
            detailedLineStops.set(lineToSimulate, lineStops.filter(stop => {
                return stop.line == lineToSimulate.line && stop.route == lineToSimulate.route;
            }).map(stop => {
                return {
                    line : stop.line,
	                  route : stop.route,
	                  stopSequence : stop.stopSequence,
	                  stop : stop.stop,
	                  nextStopDistance : stop.nextStopDistance,
	                  direction : stop.direction
                };
            }).sort((left, right) => {
                return left.stopSequence - right.stopSequence;
            }));

            lineToSimulate.totalLength = detailedLineStops.get(lineToSimulate)
                .map(stop => stop.nextStopDistance)
                .reduce((accumulator, current) => {
                    return accumulator + current;
                }, 0);

            var sumOfLength = 0;
            detailedLineStops.get(lineToSimulate).forEach(stop => {
                sumOfLength = sumOfLength + stop.nextStopDistance;
                stop.totalLength = sumOfLength;
            });
        });

        var lineTimetablesPromise = LineTimetableModel.find().exec();
        lineTimetablesPromise.then(timetables => {
            newTimetables = [];
            timetables.forEach(oldRecord => {
                var newOldRecord = JSON.parse(JSON.stringify(oldRecord)); 
                var record = {
                    line: newOldRecord.line,
                    endOne: newOldRecord.endOne,
                    endTwo: newOldRecord.endTwo
                };
                var line = global.linesToSimulate.find(lineToSimulate => {
                    return lineToSimulate.line == record.line;
                });

                if (line) {
                    if (record.endOne) {
                        var hour = parseInt(record.endOne.split(":")[0]);
                        var minute = parseInt(record.endOne.split(":")[1]);
                        record.endOneRealStart = new Date();
                        record.endOneRealStart.setHours(hour,minute,0,0);
                        // Average speed of a vehicle is 30km/h.
                        var secondsNeeded = line.totalLength * 36 / 300;
                        record.endOneEstimatedEnd = new Date(record.endOneRealStart.getTime());
                        record.endOneEstimatedEnd.setSeconds(record.endOneRealStart.getSeconds() + secondsNeeded);
                    }
                    if (record.endTwo) {
                        var hour = parseInt(record.endTwo.split(":")[0]);
                        var minute = parseInt(record.endTwo.split(":")[1]);
                        record.endTwoRealStart = new Date();
                        record.endTwoRealStart.setHours(hour,minute,0,0);
                        // Average speed of a vehicle is 30km/h.
                        var secondsNeeded = line.totalLength * 36 / 300;
                        record.endTwoEstimatedEnd = new Date(record.endTwoRealStart.getTime());
                        record.endTwoEstimatedEnd.setSeconds(record.endTwoRealStart.getSeconds() + secondsNeeded);
                    }
                    newTimetables.push(record);
                }
            });

            simulation({
              lineStops: detailedLineStops,
              timetables: newTimetables,
              nextStops: global.nextStops,
              linesTracked: global.linesTracked
            });
        }).catch(reason => {
            console.log(reason);
        });
    }).catch(reason => {
        console.log(reason);
    });
}

// Start listening for requests.
app.listen(80, function () {
  console.log('Listening on port 80!');
});

prepareSimulation(global);
