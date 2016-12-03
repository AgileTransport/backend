var TrackModel = require('./TrackModel.js');

/**
 * TrackController.js
 *
 * @description :: Server-side logic for managing Tracks.
 */
module.exports = {

    /**
     * TrackController.list()
     */
    list: function (req, res) {
        TrackModel.find(function (err, Tracks) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Track.',
                    error: err
                });
            }
            return res.json(Tracks);
        });
    },

    /**
     * TrackController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        TrackModel.findOne({_id: id}, function (err, Track) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Track.',
                    error: err
                });
            }
            if (!Track) {
                return res.status(404).json({
                    message: 'No such Track'
                });
            }
            return res.json(Track);
        });
    },

    /**
     * TrackController.create()
     */
    create: function (req, res) {
        var Track = new TrackModel({			id : req.body.id,			line : req.body.line,			route : req.body.route,			nextStop : req.body.nextStop,			latitude : req.body.latitude,			longitude : req.body.longitude,			speed : req.body.speed
        });

        Track.save(function (err, Track) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Track',
                    error: err
                });
            }
            return res.status(201).json(Track);
        });
    },

    /**
     * TrackController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        TrackModel.findOne({_id: id}, function (err, Track) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Track',
                    error: err
                });
            }
            if (!Track) {
                return res.status(404).json({
                    message: 'No such Track'
                });
            }

            Track.id = req.body.id ? req.body.id : Track.id;			Track.line = req.body.line ? req.body.line : Track.line;			Track.route = req.body.route ? req.body.route : Track.route;			Track.nextStop = req.body.nextStop ? req.body.nextStop : Track.nextStop;			Track.latitude = req.body.latitude ? req.body.latitude : Track.latitude;			Track.longitude = req.body.longitude ? req.body.longitude : Track.longitude;			Track.speed = req.body.speed ? req.body.speed : Track.speed;			
            Track.save(function (err, Track) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Track.',
                        error: err
                    });
                }

                return res.json(Track);
            });
        });
    },

    /**
     * TrackController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        TrackModel.findByIdAndRemove(id, function (err, Track) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Track.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
