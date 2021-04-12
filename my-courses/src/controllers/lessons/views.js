const asyncHandler = require('../../middleware/asyncHandler');
const service = require('../../services/lessons');

exports.getLesson = asyncHandler(async (req, res, next) => {
  const lesson = await service.getOne(req.params.id);
  const { course } = req;
  res.render('lesson', { lesson: lesson.toObject(), course: course.toObject() });
});

exports.createLesson = asyncHandler(async (req, res, next) => {
  const { course } = req;
  await service.create({ ...req.body, course: course.id });
  res.redirect(`/courses/${course.id}/edit`);
});

exports.updateLesson = asyncHandler(async (req, res, next) => {
  const { course } = req;
  await service.update(req.params.id, req.body);
  res.redirect(`/courses/${course.id}/edit`);
});
