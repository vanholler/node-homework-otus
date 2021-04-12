const asyncHandler = require('../../middleware/asyncHandler');

module.exports = service => ({
  getCurrent: asyncHandler(async (req, res, next) => {
    res.render('my-courses', { user: req.user.toObject() });
  }),
});
