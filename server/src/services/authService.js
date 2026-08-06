const User = require('../models/User');
const OTP = require('../models/OTP');
const ApiError = require('../utils/apiError');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
const { users: mockUsers } = require('../data/store');

class AuthService {
  async registerUser(userData) {
    const { name, mobile, aadhaar, villageName, wardNo, role, password } = userData;

    // Check MongoDB if connected
    if (User.db && User.db.readyState === 1) {
      const existingUser = await User.findOne({
        $or: [{ mobile }, ...(aadhaar ? [{ aadhaar }] : [])],
      });

      if (existingUser) {
        throw new ApiError(400, 'User with this mobile or Aadhaar is already registered');
      }

      const user = await User.create({
        name,
        mobile,
        aadhaar,
        villageName: villageName || 'Gram Panchayat Chandanpura',
        wardNo: wardNo || '1',
        role: role || 'Citizen',
        password,
      });

      const token = generateToken({
        id: user._id,
        mobile: user.mobile,
        name: user.name,
        role: user.role,
      });

      const userObj = user.toObject();
      delete userObj.password;

      return { user: userObj, token };
    }

    // In-memory fallback
    const existing = mockUsers.find((u) => u.mobile === mobile || (aadhaar && u.aadhaar === aadhaar));
    if (existing) {
      throw new ApiError(400, 'User with this mobile or Aadhaar is already registered');
    }

    const newUser = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name,
      mobile,
      aadhaar: aadhaar || `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      villageName: villageName || 'Gram Panchayat Chandanpura',
      wardNo: wardNo || '1',
      role: role || 'Citizen',
      password,
      rationCardNo: `MP-SEC-${Math.floor(100000 + Math.random() * 900000)}`,
      landHoldingAcres: '2.0',
      familyMembers: 3,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    const token = generateToken({
      id: newUser.id,
      mobile: newUser.mobile,
      name: newUser.name,
      role: newUser.role,
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword, token };
  }

  async loginUser(mobile, password) {
    if (User.db && User.db.readyState === 1) {
      const user = await User.findOne({
        $or: [{ mobile }, { aadhaar: mobile }],
      }).select('+password');

      if (!user) {
        throw new ApiError(401, 'Invalid mobile number/Aadhaar or password');
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new ApiError(401, 'Invalid mobile number/Aadhaar or password');
      }

      const token = generateToken({
        id: user._id,
        mobile: user.mobile,
        name: user.name,
        role: user.role,
      });

      const userObj = user.toObject();
      delete userObj.password;

      return { user: userObj, token };
    }

    // In-memory fallback
    const user = mockUsers.find((u) => u.mobile === mobile || u.aadhaar === mobile);
    if (!user || user.password !== password) {
      throw new ApiError(401, 'Invalid mobile number/Aadhaar or password');
    }

    const token = generateToken({
      id: user.id,
      mobile: user.mobile,
      name: user.name,
      role: user.role,
    });

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async generateOTP(mobile, purpose = 'LOGIN') {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    if (OTP.db && OTP.db.readyState === 1) {
      await OTP.deleteMany({ mobile, purpose });
      await OTP.create({
        mobile,
        otp: generatedOtp,
        purpose,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });
    }

    console.log(`[OTP Service] Sent OTP ${generatedOtp} to ${mobile} for ${purpose}`);
    return { mobile, otp: generatedOtp, purpose };
  }

  async verifyOTP(mobile, otp, purpose = 'LOGIN') {
    if (OTP.db && OTP.db.readyState === 1) {
      const otpRecord = await OTP.findOne({ mobile, otp, purpose });
      if (!otpRecord) {
        throw new ApiError(400, 'Invalid or expired OTP');
      }
      await OTP.deleteMany({ mobile, purpose });
    } else {
      // Demo OTP validation
      if (otp !== '543210' && otp !== '123456') {
        throw new ApiError(400, 'Invalid OTP. Demo OTP is 543210');
      }
    }

    // Return or create user session
    let user = mockUsers.find((u) => u.mobile === mobile);
    if (!user) {
      user = {
        id: `USR-${Math.floor(100 + Math.random() * 900)}`,
        name: 'Citizen User',
        mobile,
        villageName: 'Gram Panchayat Chandanpura',
        wardNo: '1',
        role: 'Citizen',
        rationCardNo: 'MP-SEC-112233',
        landHoldingAcres: '1.0',
        familyMembers: 3,
      };
      mockUsers.push(user);
    }

    const token = generateToken({
      id: user.id || user._id,
      mobile: user.mobile,
      name: user.name,
      role: user.role,
    });

    return { user, token };
  }
}

module.exports = new AuthService();
