const Course = require('../models/courses');
const { NotFoundError } = require('../common/errors');
const asyncHandler = require('./asyncHandler');

const withCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId);

  if (!course) {
    return next(new NotFoundError(`Course not found with id of ${courseId}`));
  }
  req.course = course;
  next();
});

module.exports = withCourse;
