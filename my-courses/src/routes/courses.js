const express = require('express');

const apiController = require('../controllers/courses/api');
const viewController = require('../controllers/courses/views');
const protect = require('../middleware/protect');
const onlyOwner = require('../middleware/onlyOwner');
const { validationRules, validateApi, validateView } = require('../middleware/courseValidator');

const router = express.Router();

router.get('/courses', viewController.getCourses);

router
  .route('/courses/create')
  .get(protect, (req, res) => res.render('create-course'))
  .post(protect, validationRules(), validateView, viewController.createCourse);

router.get('/courses/:id', viewController.getCourse);
router.get('/courses/:id/edit', protect, onlyOwner, viewController.editCourse);
router.get('/courses/:id/join', protect, viewController.joinUserToCourse);
router.post('/courses/:id/edit', onlyOwner, viewController.updateCourse);

router
  .route('/api/v1/courses')
  .get(apiController.getCourses)
  .post(protect, validationRules(), validateApi, apiController.createCourse);

router
  .route('/api/v1/courses/:id')
  .get(apiController.getCourse)
  .patch(apiController.updateCourse)
  .delete(apiController.deleteCourse);

module.exports = router;
