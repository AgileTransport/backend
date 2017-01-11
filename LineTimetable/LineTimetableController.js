var LineTimetableModel = require('./LineTimetableModel.js');

/**
 * LineTimetableController.js
 *
 * @description :: Server-side logic for managing LineTimetables.
 */
module.exports = {

    /**
     * LineTimetableController.list()
     */
    list: function (req, res) {
        LineTimetableModel.find(function (err, LineTimetables) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting LineTimetable.',
                    error: err
                });
            }
            return res.json(LineTimetables);
        });
    },

    /**
     * LineTimetableController.timetable()
     */
    timetable: function (req, res) {
        console.log("timetable call, params:");
        var line = String(req.params.line);
        console.log(line);
        console.log(typeof line);
        console.log("------------------------");
        //LineTimetableModel.find(function (err, LineTimetables) {
        LineTimetableModel.find({"line": line}, function (err, LineTimetables) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting LineTimetable.',
                    error: err
                });
            }
            console.log(LineTimetables.length);
            return res.json(LineTimetables);
        });
    },

    /**
     * LineTimetableController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        console.log("showCall, params:");
        console.log(req.params);
        LineTimetableModel.findOne({_id: id}, function (err, LineTimetable) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting LineTimetable.',
                    error: err
                });
            }
            if (!LineTimetable) {
                return res.status(404).json({
                    message: 'No such LineTimetable'
                });
            }
            return res.json(LineTimetable);
        });
    },

    /**
     * LineTimetableController.create()
     */
    create: function (req, res) {
        var LineTimetable = new LineTimetableModel({
			line : req.body.line,
			route : req.body.route,
			time : req.body.time
        });

        LineTimetable.save(function (err, LineTimetable) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating LineTimetable',
                    error: err
                });
            }
            return res.status(201).json(LineTimetable);
        });
    },

    /**
     * LineTimetableController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        LineTimetableModel.findOne({_id: id}, function (err, LineTimetable) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting LineTimetable',
                    error: err
                });
            }
            if (!LineTimetable) {
                return res.status(404).json({
                    message: 'No such LineTimetable'
                });
            }

            LineTimetable.line = req.body.line ? req.body.line : LineTimetable.line;
			LineTimetable.route = req.body.route ? req.body.route : LineTimetable.route;
			LineTimetable.time = req.body.time ? req.body.time : LineTimetable.time;
			
            LineTimetable.save(function (err, LineTimetable) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating LineTimetable.',
                        error: err
                    });
                }

                return res.json(LineTimetable);
            });
        });
    },

    /**
     * LineTimetableController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        LineTimetableModel.findByIdAndRemove(id, function (err, LineTimetable) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the LineTimetable.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
