const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { users } = require('../data/store');
const { authenticateJWT } = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'ruralsync_jwt_secret_key_2025_chandanpura_sehore';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Register Endpoint
router.post('/register', (req, res) => {
  const { name, mobile, aadhaar, villageName, wardNo, role, password } = req.body;

  if (!name || !mobile || !password) {
    return res.status(400).json({ message: 'Name, Mobile number, and Password are required' });
  }

  const existingUser = users.find((u) => u.mobile === mobile || (aadhaar && u.aadhaar === aadhaar));
  if (existingUser) {
    return res.status(400).json({ message: 'User with this mobile or Aadhaar is already registered' });
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

  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, mobile: newUser.mobile, name: newUser.name, role: newUser.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  const { password: _, ...userWithoutPassword } = newUser;
  return res.status(201).json({
    message: 'Registration successful',
    token,
    user: userWithoutPassword,
  });
});

// Login Endpoint
router.post('/login', (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res.status(400).json({ message: 'Mobile number/Aadhaar and Password are required' });
  }

  const user = users.find((u) => u.mobile === mobile || u.aadhaar === mobile);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid mobile number/Aadhaar or password' });
  }

  const token = jwt.sign(
    { id: user.id, mobile: user.mobile, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  const { password: _, ...userWithoutPassword } = user;
  return res.json({
    message: 'Login successful',
    token,
    user: userWithoutPassword,
  });
});

// Get Current User Profile (JWT Verified)
router.get('/me', authenticateJWT, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User profile not found' });
  }

  const { password: _, ...userWithoutPassword } = user;
  return res.json({ user: userWithoutPassword });
});

module.exports = router;
