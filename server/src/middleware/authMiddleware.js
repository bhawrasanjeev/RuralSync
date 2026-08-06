const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.ruralsync_token) {
    token = req.cookies.ruralsync_token;
  }

  if (!token) {
    throw new ApiError(401, 'Unauthorized: Access token missing. Please sign in.');
  }

  try {
    const secret = process.env.JWT_SECRET || 'ruralsync_super_secret_jwt_key_2025_chandanpura';
    const decoded = jwt.verify(token, secret);

    // Fetch user from database if MongoDB connected
    let user = null;
    if (User.db && User.db.readyState === 1) {
      user = await User.findById(decoded.id).select('-password');
    }

    if (!user) {
      // Fallback user object from decoded token payload
      user = {
        _id: decoded.id,
        id: decoded.id,
        name: decoded.name || 'Citizen User',
        mobile: decoded.mobile,
        role: decoded.role || 'Citizen',
        wardNo: decoded.wardNo || '3',
        villageName: decoded.villageName || 'Gram Panchayat Chandanpura',
      };
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, 'Unauthorized: Invalid or expired JWT token');
  }
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Forbidden: Role '${req.user ? req.user.role : 'Guest'}' is not authorized to access this resource`
      );
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };
