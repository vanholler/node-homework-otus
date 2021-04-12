const Lesson = require('../models/lessons');
const { NotFoundError } = require('../common/errors');

exports.get = async course => {
  const lessons = await Lesson.find({ course });
  return lessons;
};

exports.getOne = async id => {
  const lesson = await Lesson.findById(id);
  if (!lesson) {
    throw new NotFoundError(`Lesson not found with id of ${id}`);
  }
  return lesson;
};

exports.create = async data => {
  const lesson = await Lesson.create(data);
  return lesson;
};

exports.update = async (id, data) => {
  const lesson = await Lesson.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!lesson) {
    throw new NotFoundError(`Lesson not found with id of ${id}`);
  }
  return lesson;
};

exports.delete = async id => {
  const lesson = await Lesson.findById(id);
  if (!lesson) {
    throw new NotFoundError(`Lesson not found with id of ${id}`);
  }
  lesson.remove();
};
