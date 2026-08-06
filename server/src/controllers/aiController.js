const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const aiService = require('../services/aiService');

const askGramMitra = asyncHandler(async (req, res) => {
  const { prompt, message, context } = req.body;
  const userQuery = prompt || message;

  const result = await aiService.generateGramMitraResponse(userQuery, context);

  return res.status(200).json(
    new ApiResponse(200, result, 'Gram Mitra AI response generated successfully')
  );
});

module.exports = {
  askGramMitra,
};
