const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
  title: String,
  autor: {
    // TODO replace to mongoose.Schema.ObjectId
    type: String,
    required: [true, 'autor is required!'],
  },
  text: {
    type: String,
    required: [true, 'Text is required!'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Resource = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required!'],
  },
  link: {
    type: String,
    required: [true, 'Link is required!'],
  },
});

const LessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
      unique: false,
      trim: true,
      maxlength: [100, 'Name can not be more than 50 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Decription can not be more than 50 characters'],
    },
    video: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    course: {
      type: mongoose.Schema.ObjectId,
      ref: 'Course',
      require: true,
    },
    comments: [Comment],
    resources: [Resource],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

LessonSchema.pre('remove', async function(next) {
  next();
});

LessonSchema.pre('save', function(next) {
  next();
});

module.exports = mongoose.model('Lesson', LessonSchema);
