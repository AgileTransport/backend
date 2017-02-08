var ArrivalModel = require('./ArrivalModel.js');

/**
 * ArrivalController.js
 *
 * @description :: Server-side logic for managing Arrivals.
 */
module.exports = {

    forStop: function (req, res) {
        var latitude = parseFloat(req.query.lat);
        var longitude = parseFloat(req.query.long);

        console.log(latitude);
        console.log(longitude);

        var closestStop = null;
        var distance = 10000000.0;
        global.stops.forEach(function (stop) {
            var dist = (stop.latitude - latitude) * (stop.latitude - latitude)
                + (stop.longitude - longitude) * (stop.longitude - longitude);
            
            if (dist < distance) {
                distance = dist;
                closestStop = stop;
            }
        });

        if (closestStop) {
            if (global.nextStops.has(closestStop.id)) {
                console.log(closestStop.id);

                var results = [];
                global.nextStops.get(closestStop.id).forEach(function (arrival, key) {
                    results.push({
                        line: arrival.lineFull,
                        time: arrival.timeNeeded.toFixed(1)
                    });
                });

                console.log(results);
                return res.json(results);
            }

            return res.json([]);
        }

        return res.json([]);
    },

    /**
     * ArrivalController.list()
     */
    list: function (req, res) {
        ArrivalModel.find(function (err, Arrivals) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Arrival.',
                    error: err
                });
            }
            return res.json(Arrivals);
        });
    },

    /**
     * ArrivalController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        ArrivalModel.findOne({_id: id}, function (err, Arrival) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Arrival.',
                    error: err
                });
            }
            if (!Arrival) {
                return res.status(404).json({
                    message: 'No such Arrival'
                });
            }
            return res.json(Arrival);
        });
    },

    /**
     * ArrivalController.create()
     */
    create: function (req, res) {
        var Arrival = new ArrivalModel({
			id : req.body.id,
			line : req.body.line,
			estimatedTime : req.body.estimatedTime,
			unit : req.body.unit
        });

        Arrival.save(function (err, Arrival) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Arrival',
                    error: err
                });
            }
            return res.status(201).json(Arrival);
        });
    },

    /**
     * ArrivalController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        ArrivalModel.findOne({_id: id}, function (err, Arrival) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Arrival',
                    error: err
                });
            }
            if (!Arrival) {
                return res.status(404).json({
                    message: 'No such Arrival'
                });
            }

            Arrival.id = req.body.id ? req.body.id : Arrival.id;
			Arrival.line = req.body.line ? req.body.line : Arrival.line;
			Arrival.estimatedTime = req.body.estimatedTime ? req.body.estimatedTime : Arrival.estimatedTime;
			Arrival.unit = req.body.unit ? req.body.unit : Arrival.unit;
			
            Arrival.save(function (err, Arrival) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Arrival.',
                        error: err
                    });
                }

                return res.json(Arrival);
            });
        });
    },

    /**
     * ArrivalController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        ArrivalModel.findByIdAndRemove(id, function (err, Arrival) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Arrival.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
