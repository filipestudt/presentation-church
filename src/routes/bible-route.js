const express = require('express');
const router = express.Router();
const controller = require('../controllers/bible-controller');

router.get('/:book/:chapter', controller.get);

module.exports = router;