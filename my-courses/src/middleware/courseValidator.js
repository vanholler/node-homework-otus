const { body, validationResult } = require('express-validator');

const validationRules = () => [body('title').isLength({ min: 3 })];

const validateApi = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, message: errors.array() });
  }

  next();
};

const validateView = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg, param }) => `${param} - ${msg}`);
  if (!errors.isEmpty()) {
    return res.render('create-course', { message: `Validation Error: ${errors.array().join(', ')}` });
  }

  next();
};

module.exports = {
  validationRules,
  validateApi,
  validateView,
};
