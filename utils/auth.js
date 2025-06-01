const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const logger = require('../middleware/logger');

// Generate access token
exports.generateToken = (userId, role) => {
  if (!process.env.JWT_SECRET) {
    const generatedSecret = crypto.randomBytes(64).toString('hex');
    logger.warn('JWT_SECRET not set, using generated secret. This should only happen in development!');
    process.env.JWT_SECRET = generatedSecret;
  }

  return jwt.sign(
    { 
      id: userId, 
      role,
      iss: 'zephyr-api',
      aud: 'zephyr-client'
    }, 
    process.env.JWT_SECRET, 
    { 
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      algorithm: 'HS256'
    }
  );
};

// Generate refresh token
exports.generateRefreshToken = (userId) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    const generatedSecret = crypto.randomBytes(64).toString('hex');
    logger.warn('JWT_REFRESH_SECRET not set, using generated secret. This should only happen in development!');
    process.env.JWT_REFRESH_SECRET = generatedSecret;
  }

  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

// Set token cookie
exports.setTokenCookie = (res, token) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: parseInt(process.env.JWT_COOKIE_EXPIRES) || 3600000,
    path: '/',
    domain: process.env.COOKIE_DOMAIN || undefined
  };
  res.cookie('token', token, options);
};

// Clear token cookie
exports.clearTokenCookie = (res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    domain: process.env.COOKIE_DOMAIN || undefined
  });
};