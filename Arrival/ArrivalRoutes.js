var express = require('express');
var router = express.Router();
var ArrivalController = require('./ArrivalController.js');

/*
 * GET
 */
router.get('/', ArrivalController.list);

/*
 * GET
 */
router.get('/:id', ArrivalController.show);

/*
 * POST
 */
router.post('/', ArrivalController.create);

/*
 * PUT
 */
router.put('/:id', ArrivalController.update);

/*
 * DELETE
 */
router.delete('/:id', ArrivalController.remove);

module.exports = router;
