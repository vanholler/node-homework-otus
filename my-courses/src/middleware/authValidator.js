const { body, validationResult } = require('express-validator');

const loginValidationRules = () => [body('email').isEmail(), body('password').notEmpty()];
const registrationValidationRules = () => [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('name').notEmpty(),
];

const validateApi = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, message: errors.array() });
  }

  next();
};

const validateView = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ param, msg }) => `${param} - ${msg.toLowerCase()}`);
  if (!errors.isEmpty()) {
    const message = `Errors: ${errors.array().join(', ')}`;
    const isLoginError = req.path.endsWith('login');
    return res.render('auth', { message, isLoginError });
  }

  next();
};

module.exports = {
  loginValidationRules,
  registrationValidationRules,
  validateApi,
  validateView,
};
