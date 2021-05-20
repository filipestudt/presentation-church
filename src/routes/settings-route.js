const express = require('express');
const router = express.Router();
const controller = require('../controllers/settings-controller');

router.get('/get', controller.get);
router.post('/save', controller.save);

module.exports = router;