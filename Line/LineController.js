var LineModel = require('./LineModel.js');

/**
 * LineController.js
 *
 * @description :: Server-side logic for managing Lines.
 */
module.exports = {

    /**
     * LineController.list()
     */
    list: function (req, res) {
        LineModel.find(function (err, Lines) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Line.',
                    error: err
                });
            }
            return res.json(Lines);
        });
    },

    /**
     * LineController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        LineModel.findOne({_id: id}, function (err, Line) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Line.',
                    error: err
                });
            }
            if (!Line) {
                return res.status(404).json({
                    message: 'No such Line'
                });
            }
            return res.json(Line);
        });
    },

    /**
     * LineController.create()
     */
    create: function (req, res) {
        var Line = new LineModel({			id : req.body.id,			endOne : req.body.endOne,			endTwo : req.body.endTwo,			type : req.body.type
        });

        Line.save(function (err, Line) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Line',
                    error: err
                });
            }
            return res.status(201).json(Line);
        });
    },

    /**
     * LineController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        LineModel.findOne({_id: id}, function (err, Line) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Line',
                    error: err
                });
            }
            if (!Line) {
                return res.status(404).json({
                    message: 'No such Line'
                });
            }

            Line.id = req.body.id ? req.body.id : Line.id;			Line.endOne = req.body.endOne ? req.body.endOne : Line.endOne;			Line.endTwo = req.body.endTwo ? req.body.endTwo : Line.endTwo;			Line.type = req.body.type ? req.body.type : Line.type;			
            Line.save(function (err, Line) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Line.',
                        error: err
                    });
                }

                return res.json(Line);
            });
        });
    },

    /**
     * LineController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        LineModel.findByIdAndRemove(id, function (err, Line) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Line.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
