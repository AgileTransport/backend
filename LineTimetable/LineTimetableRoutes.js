var express = require('express');
var router = express.Router();
var LineTimetableController = require('./LineTimetableController.js');

/*
 * GET
 */
router.get('/', LineTimetableController.list);

/*
 * GET
 */
router.get('/:id', LineTimetableController.show);

/*
 * GET
 */
router.get('/:line', LineTimetableController.timetable);

/*
 * POST
 */
router.post('/', LineTimetableController.create);

/*
 * PUT
 */
router.put('/:id', LineTimetableController.update);

/*
 * DELETE
 */
router.delete('/:id', LineTimetableController.remove);

module.exports = router;
