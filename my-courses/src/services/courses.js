const Course = require('../models/courses');
const { NotFoundError } = require('../common/errors');
const { defaultPaginationLimit, maxPaginationLimit } = require('../config');

exports.get = async (page = 1, limit = defaultPaginationLimit) => {
  let query = Course.find().sort('-createdAt');

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Course.countDocuments();

  let pageLimit = limit > maxPaginationLimit ? maxPaginationLimit : limit;
  query = query.skip(startIndex).limit(pageLimit);

  const courses = await query;

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  return { courses, pagination };
};

exports.getOne = async id => {
  const course = await Course.findById(id)
    .populate('lessons')
    .populate('author');
  if (!course) {
    throw new NotFoundError(`Course not found with id of ${id}`);
  }
  return course;
};

exports.create = async data => {
  const course = await Course.create(data);
  return course;
};

exports.update = async (id, data) => {
  const course = await Course.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    throw new NotFoundError(`Course not found with id of ${id}`);
  }
  return course;
};

exports.delete = async id => {
  const course = await Course.findById(id);
  if (!course) {
    throw new NotFoundError(`Course not found with id of ${id}`);
  }
  course.remove();
};
