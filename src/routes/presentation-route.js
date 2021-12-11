const express = require('express');
const router = express.Router();
const controller = require('../controllers/presentation-controller');

router.get('/', controller.get);
router.get('/favorites', controller.getFavorites);
router.get('/:id', controller.getById);
router.get('/name/:name', controller.getByName);
router.get('/category/:category', controller.getByCategory);
router.get('/setAsFavorite/:id', controller.setAsFavorite);
router.get('/removeFavorite/:id', controller.removeFavorite);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;