var express = require('express');
var router = express.Router();
var LineController = require('./LineController.js');

/*
 * GET
 */
router.get('/', LineController.list);

/*
 * GET
 */
router.get('/:id', LineController.show);

/*
 * POST
 */
router.post('/', LineController.create);

/*
 * PUT
 */
router.put('/:id', LineController.update);

/*
 * DELETE
 */
router.delete('/:id', LineController.remove);

module.exports = router;
