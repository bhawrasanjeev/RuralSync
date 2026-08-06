const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const noticeService = require('../services/noticeService');

const getNotices = asyncHandler(async (req, res) => {
  const notices = await noticeService.getAllNotices(req.query);
  return res.status(200).json(
    new ApiResponse(200, notices, 'Village notices retrieved successfully')
  );
});

const createNotice = asyncHandler(async (req, res) => {
  const notice = await noticeService.createNotice(req.body);
  return res.status(201).json(
    new ApiResponse(201, notice, 'New village notice published successfully')
  );
});

module.exports = {
  getNotices,
  createNotice,
};
