const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  verifyOTPValidation,
} = require('../validators/authValidator');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

// Public Auth Endpoints
router.post('/register', authLimiter, registerValidation, authController.register);
router.post('/login', authLimiter, loginValidation, authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', authLimiter, forgotPasswordValidation, authController.forgotPassword);
router.post('/verify-otp', authLimiter, verifyOTPValidation, authController.verifyOTP);

// Protected Auth Endpoints (JWT Required)
router.get('/me', protect, authController.getProfile);
router.get('/profile', protect, authController.getProfile);

module.exports = router;
