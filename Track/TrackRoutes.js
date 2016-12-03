var express = require('express');
var router = express.Router();
var TrackController = require('./TrackController.js');

/*
 * GET
 */
router.get('/', TrackController.list);

/*
 * GET
 */
router.get('/:id', TrackController.show);

/*
 * POST
 */
router.post('/', TrackController.create);

/*
 * PUT
 */
router.put('/:id', TrackController.update);

/*
 * DELETE
 */
router.delete('/:id', TrackController.remove);

module.exports = router;
