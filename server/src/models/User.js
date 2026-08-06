const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter citizen full name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    mobile: {
      type: String,
      required: [true, 'Please enter 10-digit mobile number'],
      unique: true,
      trim: true,
      index: true,
    },
    aadhaar: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      sparse: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['Citizen', 'Volunteer', 'Officer', 'Admin'],
      default: 'Citizen',
      index: true,
    },
    villageName: {
      type: String,
      default: 'Gram Panchayat Chandanpura',
      trim: true,
    },
    wardNo: {
      type: String,
      default: '1',
      trim: true,
    },
    rationCardNo: {
      type: String,
      trim: true,
    },
    landHoldingAcres: {
      type: String,
      default: '1.5',
    },
    familyMembers: {
      type: Number,
      default: 4,
    },
    avatar: {
      type: String,
      default: '',
    },
    isKYCVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
