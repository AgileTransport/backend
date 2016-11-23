var express = require('express');
var router = express.Router();
var UpcomingController = require('../controllers/UpcomingController.js');

/*
 * GET
 */
router.get('/', UpcomingController.list);

/*
 * GET
 */
router.get('/:id', UpcomingController.show);

/*
 * POST
 */
router.post('/', UpcomingController.create);

/*
 * PUT
 */
router.put('/:id', UpcomingController.update);

/*
 * DELETE
 */
router.delete('/:id', UpcomingController.remove);

module.exports = router;
