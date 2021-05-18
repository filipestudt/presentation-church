const express = require('express');
const router = express.Router();
const controller = require('../controllers/bible-controller');

router.get('/:book/:chapter', controller.get);
router.get('/books', controller.getBooks);
router.get('/:book', controller.getChapters);

module.exports = router;