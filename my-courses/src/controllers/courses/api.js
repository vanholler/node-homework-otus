const asyncHandler = require('../../middleware/asyncHandler');
const service = require('../../services/courses');
const { defaultPaginationLimit } = require('../../config');

exports.getCourses = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || defaultPaginationLimit;
  const courses = await service.get(page, limit);
  res.status(200).json({ success: true, data: courses });
});

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await service.getOne(req.params.id);
  res.status(200).json({ success: true, data: course });
});

exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await service.create({ ...req.body, author: req.user.id });
  res.status(201).json({
    success: true,
    msg: `Course created`,
    data: course,
  });
});

exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await service.update(req.params.id, req.body);
  res.status(201).json({
    success: true,
    msg: `Course updated`,
    data: course,
  });
});

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  await service.delete(req.params.id);
  res.status(200).json({ success: true, msg: 'Course deleted', data: {} });
});
