const asyncHandler = require('../../middleware/asyncHandler');

module.exports = service => ({
  get: asyncHandler(async (req, res, next) => {
    const users = await service.get();
    res.status(200).json({ success: true, data: users });
  }),
  getOne: asyncHandler(async (req, res, next) => {
    const user = await service.getOne(req.params.id);
    res.status(200).json({ success: true, data: user });
  }),
});
