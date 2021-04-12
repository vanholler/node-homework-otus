const { AuthError } = require('../common/errors');

module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next(new AuthError('Not Authenticated'));
  }
  next();
};
