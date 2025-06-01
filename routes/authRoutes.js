const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../models');
const { generateToken, generateRefreshToken } = require('../utils/auth');
const { userValidationRules } = require('../validators/userValidator');
const logger = require('../middleware/logger');

router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Auth endpoint is working!',
    availableEndpoints: [
      { method: 'POST', path: '/login' },
      { method: 'POST', path: '/refresh-token' },
      { method: 'POST', path: '/logout' }
    ]
  });
});
// Enhanced login route with better error handling
router.post('/login', userValidationRules(), async (req, res) => {
  const { Email, MotDePasse } = req.body;

  try {
    // 1. Find user with case-insensitive email
    const user = await db.Utilisateur.findOne({
      where: db.sequelize.where(
        db.sequelize.fn('LOWER', db.sequelize.col('Email')),
        db.sequelize.fn('LOWER', Email)
      )
    });

    if (!user) {
      logger.warn(`Login attempt for unknown email: ${Email}`);
      return res.status(401).json({
        status: 'error',
        error: 'Invalid credentials'
      });
    }

    // 2. Validate password
    const isValid = await user.validPassword(MotDePasse);

    if (!isValid) {
      logger.warn(`Invalid password attempt for user: ${user.id}`);
      return res.status(401).json({
        status: 'error',
        error: 'Invalid credentials'
      });
    }

    // 3. Generate tokens
    const token = generateToken(user.id, user.Role);
    const refreshToken = generateRefreshToken(user.id);

    // 4. Set secure cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 604800000 // 7 days
    });

    // 5. Prepare response
    const userResponse = { ...user.toJSON() };
    delete userResponse.MotDePasse;

    logger.info(`User ${user.id} logged in successfully`);
    res.status(200).json({
      status: 'success',
      user: userResponse,
      token // Also return token in response for mobile clients
    });

  } catch (error) {
    logger.error('Login error:', { error: error.stack });
    res.status(500).json({
      status: 'error',
      error: 'Login failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Refresh token route (unchanged but with better logging)
router.post('/refresh-token', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    logger.warn('Refresh token missing');
    return res.status(401).json({
      status: 'error',
      error: 'Refresh token missing'
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await db.Utilisateur.findByPk(decoded.id);

    if (!user) {
      logger.warn(`Invalid user for refresh token: ${decoded.id}`);
      return res.status(401).json({
        status: 'error',
        error: 'Invalid user'
      });
    }

    const newToken = generateToken(user.id, user.Role);

    res.cookie('token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000
    });

    logger.info(`Token refreshed for user: ${user.id}`);
    res.status(200).json({
      status: 'success',
      token: newToken
    });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      logger.warn('Refresh token expired');
      return res.status(401).json({
        status: 'error',
        error: 'Refresh token expired'
      });
    }

    logger.error('Refresh token error:', { error: error.stack });
    res.status(401).json({
      status: 'error',
      error: 'Invalid refresh token'
    });
  }
});

// Logout route (unchanged but with logging)
router.post('/logout', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      logger.info(`User ${decoded.id} logged out`);
    } catch (e) {
      logger.warn('Invalid token during logout');
    }
  }

  res.clearCookie('token');
  res.clearCookie('refreshToken');
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
});

router.post('/request-reset', async (req, res) => {
  console.log("Hi");
  const { email } = req.body;

  try {
    const user = await db.Utilisateur.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const resetToken = jwt.sign(
      { id: user.id, purpose: 'password-reset' },
      process.env.JWT_SECRET,
      { expiresIn: '5m' }
    );

    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

    console.log(`Send this link to ${email}: ${resetUrl}`);

    res.status(200).json({ message: 'Reset link sent. Check your email (console).' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.purpose !== 'password-reset') {
      return res.status(400).json({ error: 'Invalid reset token purpose' });
    }

    const user = await db.Utilisateur.findByPk(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    user.MotDePasse = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(400).json({ error: 'Invalid or expired token' });
  }
});

module.exports = router;