const asyncHandler = require('../../middleware/asyncHandler');
const service = require('../../services/courses');
const { defaultPaginationLimit } = require('../../config');

exports.getCourses = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || defaultPaginationLimit;

  const { courses, pagination } = await service.get(page, limit);
  res.render('courses', {
    courses: courses.map(c => c.toObject()),
    pagination,
  });
});

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await service.getOne(req.params.id);
  res.render('course', { ...course.toObject() });
});

exports.createCourse = asyncHandler(async (req, res, next) => {
  let author = req.user.id;
  const course = await service.create({ ...req.body, author });
  res.redirect(`/courses/${course.id}/edit`);
});

exports.editCourse = asyncHandler(async (req, res, next) => {
  const course = await service.getOne(req.params.id);
  res.render('edit-course', { ...course.toObject() });
});

exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await service.update(req.params.id, req.body);
  res.redirect(`/courses/${course.id}/edit`);
});

exports.joinUserToCourse = asyncHandler(async (req, res, next) => {
  await req.user.courses.push(req.params.id);
  req.user.save();
  res.redirect(`/courses/${req.params.id}`);
});
