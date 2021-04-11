const asyncHandler = require('../../middleware/asyncHandler');
const service = require('../../services/lessons');

exports.getLessons = asyncHandler(async (req, res, next) => {
  const { course } = req;
  const lessons = await service.get(course.id);
  res.status(200).json({ success: true, data: lessons });
});

exports.getLesson = asyncHandler(async (req, res, next) => {
  const lesson = await service.getOne(req.params.id);
  res.status(200).json({ success: true, data: lesson });
});

exports.createLesson = asyncHandler(async (req, res, next) => {
  const lesson = await service.create(req.body);
  res.status(201).json({
    success: true,
    msg: `Lesson created`,
    data: lesson,
  });
});

exports.updateLesson = asyncHandler(async (req, res, next) => {
  const lesson = await service.update(req.params.id, req.body);
  res.status(201).json({
    success: true,
    msg: `Lesson updated`,
    data: lesson,
  });
});

exports.deleteLesson = asyncHandler(async (req, res, next) => {
  await service.delete(req.params.id);
  res.status(200).json({ success: true, msg: 'Lesson deleted', data: {} });
});
