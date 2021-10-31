const express = require('express');
const router = express.Router();
const controller = require('../controllers/presentation-controller');

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/name/:name', controller.getByName);
router.get('/category/:category', controller.getByCategory);
router.get('/favorites', controller.getFavorites);
router.get('/setAsFavorite/:id', controller.setAsFavorite);
router.post('/', controller.post);
router.put('/', controller.put);
router.delete('/', controller.delete);

module.exports = router;