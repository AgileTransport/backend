var StopModel = require('./StopModel.js');

/**
 * StopController.js
 *
 * @description :: Server-side logic for managing Stops.
 */
module.exports = {

    /**
     * StopController.list()
     */
    list: function (req, res) {
        StopModel.find(function (err, Stops) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Stop.',
                    error: err
                });
            }
            return res.json(Stops);
        });
    },

    /**
     * StopController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        StopModel.findOne({_id: id}, function (err, Stop) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Stop.',
                    error: err
                });
            }
            if (!Stop) {
                return res.status(404).json({
                    message: 'No such Stop'
                });
            }
            return res.json(Stop);
        });
    },

    /**
     * StopController.create()
     */
    create: function (req, res) {
        var Stop = new StopModel({			id : req.body.id,			name : req.body.name,			latitude : req.body.latitude,			longitude : req.body.longitude
        });

        Stop.save(function (err, Stop) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Stop',
                    error: err
                });
            }
            return res.status(201).json(Stop);
        });
    },

    /**
     * StopController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        StopModel.findOne({_id: id}, function (err, Stop) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Stop',
                    error: err
                });
            }
            if (!Stop) {
                return res.status(404).json({
                    message: 'No such Stop'
                });
            }

            Stop.id = req.body.id ? req.body.id : Stop.id;			Stop.name = req.body.name ? req.body.name : Stop.name;			Stop.latitude = req.body.latitude ? req.body.latitude : Stop.latitude;			Stop.longitude = req.body.longitude ? req.body.longitude : Stop.longitude;			
            Stop.save(function (err, Stop) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Stop.',
                        error: err
                    });
                }

                return res.json(Stop);
            });
        });
    },

    /**
     * StopController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        StopModel.findByIdAndRemove(id, function (err, Stop) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Stop.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
