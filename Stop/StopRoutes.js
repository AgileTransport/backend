var express = require('express');
var router = express.Router();
var StopController = require('./StopController.js');

/*
 * GET
 */
router.get('/', StopController.list);

/*
 * GET
 */
router.get('/:id', StopController.show);

/*
 * POST
 */
router.post('/', StopController.create);

/*
 * PUT
 */
router.put('/:id', StopController.update);

/*
 * DELETE
 */
router.delete('/:id', StopController.remove);

module.exports = router;
