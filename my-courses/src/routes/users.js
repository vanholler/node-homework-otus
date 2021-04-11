const express = require('express');

const User = require('../models/users');
const service = require('../services/users')(User);
const apiController = require('../controllers/users/api')(service);
const viewController = require('../controllers/users/views')(service);
const protect = require('../middleware/protect');

const router = express.Router();

router.get('/my-courses', viewController.getCurrent);

router.route('/api/v1/users').get(protect, apiController.get);
router.route('/api/v1/users/:id').get(protect, apiController.getOne);

module.exports = router;
