var LineStopModel = require('./LineStopModel.js');

/**
 * LineStopController.js
 *
 * @description :: Server-side logic for managing LineStops.
 */
module.exports = {

    /**
     * LineStopController.list()
     */
    list: function (req, res) {
        LineStopModel.find(function (err, LineStops) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting LineStop.',
                    error: err
                });
            }
            return res.json(LineStops);
        });
    },

    /**
     * LineStopController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        LineStopModel.findOne({_id: id}, function (err, LineStop) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting LineStop.',
                    error: err
                });
            }
            if (!LineStop) {
                return res.status(404).json({
                    message: 'No such LineStop'
                });
            }
            return res.json(LineStop);
        });
    },

    /**
     * LineStopController.create()
     */
    create: function (req, res) {
        var LineStop = new LineStopModel({
        });

        LineStop.save(function (err, LineStop) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating LineStop',
                    error: err
                });
            }
            return res.status(201).json(LineStop);
        });
    },

    /**
     * LineStopController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        LineStopModel.findOne({_id: id}, function (err, LineStop) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting LineStop',
                    error: err
                });
            }
            if (!LineStop) {
                return res.status(404).json({
                    message: 'No such LineStop'
                });
            }

            LineStop.line = req.body.line ? req.body.line : LineStop.line;
            LineStop.save(function (err, LineStop) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating LineStop.',
                        error: err
                    });
                }

                return res.json(LineStop);
            });
        });
    },

    /**
     * LineStopController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        LineStopModel.findByIdAndRemove(id, function (err, LineStop) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the LineStop.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};