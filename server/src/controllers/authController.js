const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const authService = require('../services/authService');
const User = require('../models/User');
const { users: mockUsers } = require('../data/store');

const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);

  // Set HTTP-only Cookie
  res.cookie('ruralsync_token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json(
    new ApiResponse(201, result, 'Citizen registered successfully')
  );
});

const login = asyncHandler(async (req, res) => {
  const { mobile, password } = req.body;
  const result = await authService.loginUser(mobile, password);

  res.cookie('ruralsync_token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(
    new ApiResponse(200, result, 'Login successful')
  );
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('ruralsync_token');
  return res.status(200).json(
    new ApiResponse(200, null, 'Logged out successfully')
  );
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { mobile } = req.body;
  const result = await authService.generateOTP(mobile, 'FORGOT_PASSWORD');
  return res.status(200).json(
    new ApiResponse(200, result, 'Password reset OTP sent to registered mobile number')
  );
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { mobile, otp, purpose } = req.body;
  const result = await authService.verifyOTP(mobile, otp, purpose || 'LOGIN');

  res.cookie('ruralsync_token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(
    new ApiResponse(200, result, 'OTP verified successfully')
  );
});

const getProfile = asyncHandler(async (req, res) => {
  let user = req.user;

  if (User.db && User.db.readyState === 1 && req.user._id) {
    user = await User.findById(req.user._id).select('-password');
  }

  return res.status(200).json(
    new ApiResponse(200, { user }, 'User profile retrieved successfully')
  );
});

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  verifyOTP,
  getProfile,
};
