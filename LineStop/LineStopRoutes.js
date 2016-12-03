var express = require('express');
var router = express.Router();
var LineStopController = require('./LineStopController.js');

/*
 * GET
 */
router.get('/', LineStopController.list);

/*
 * GET
 */
router.get('/:id', LineStopController.show);

/*
 * POST
 */
router.post('/', LineStopController.create);

/*
 * PUT
 */
router.put('/:id', LineStopController.update);

/*
 * DELETE
 */
router.delete('/:id', LineStopController.remove);

module.exports = router;
