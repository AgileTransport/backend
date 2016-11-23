var UpcomingModel = require('../models/UpcomingModel.js');

/**
 * UpcomingController.js
 *
 * @description :: Server-side logic for managing Upcomings.
 */
module.exports = {

    /**
     * UpcomingController.list()
     */
    list: function (req, res) {
        UpcomingModel.find(function (err, Upcomings) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Upcoming.',
                    error: err
                });
            }
            return res.json(Upcomings);
        });
    },

    /**
     * UpcomingController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        UpcomingModel.findOne({_id: id}, function (err, Upcoming) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Upcoming.',
                    error: err
                });
            }
            if (!Upcoming) {
                return res.status(404).json({
                    message: 'No such Upcoming'
                });
            }
            return res.json(Upcoming);
        });
    },

    /**
     * UpcomingController.create()
     */
    create: function (req, res) {
        var Upcoming = new UpcomingModel({
        });

        Upcoming.save(function (err, Upcoming) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Upcoming',
                    error: err
                });
            }
            return res.status(201).json(Upcoming);
        });
    },

    /**
     * UpcomingController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        UpcomingModel.findOne({_id: id}, function (err, Upcoming) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Upcoming',
                    error: err
                });
            }
            if (!Upcoming) {
                return res.status(404).json({
                    message: 'No such Upcoming'
                });
            }

            Upcoming.id = req.body.id ? req.body.id : Upcoming.id;
            Upcoming.save(function (err, Upcoming) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Upcoming.',
                        error: err
                    });
                }

                return res.json(Upcoming);
            });
        });
    },

    /**
     * UpcomingController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        UpcomingModel.findByIdAndRemove(id, function (err, Upcoming) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Upcoming.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};