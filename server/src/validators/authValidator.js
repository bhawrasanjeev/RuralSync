const { body, validationResult } = require('express-validator');
const ApiError = require('../utils/apiError');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    throw new ApiError(400, 'Validation Error', extractedErrors);
  };
};

const registerValidation = validate([
  body('name').notEmpty().withMessage('Full name is required').trim(),
  body('mobile')
    .notEmpty()
    .withMessage('Mobile number is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Mobile number must be exactly 10 digits'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['Citizen', 'Volunteer', 'Officer', 'Admin', 'Ward Member', 'Sarpanch'])
    .withMessage('Invalid role specified'),
]);

const loginValidation = validate([
  body('mobile')
    .notEmpty()
    .withMessage('Mobile number or Aadhaar is required'),
  body('password').notEmpty().withMessage('Password is required'),
]);

const forgotPasswordValidation = validate([
  body('mobile').notEmpty().withMessage('Mobile number is required'),
]);

const verifyOTPValidation = validate([
  body('mobile').notEmpty().withMessage('Mobile number is required'),
  body('otp').isLength({ min: 4, max: 6 }).withMessage('OTP must be 4 to 6 digits'),
]);

module.exports = {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  verifyOTPValidation,
};
