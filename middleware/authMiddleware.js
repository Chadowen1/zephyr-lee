const jwt = require('jsonwebtoken');
const logger = require('./logger');

module.exports = (req, res, next) => {
  // Get token from cookie or header
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    logger.warn('Authentication attempt without token');
    return res.status(401).json({ 
      status: 'error',
      error: "Unauthorized",
      message: "Authentication token is required"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    logger.info(`Authenticated user: ${decoded.id}`);
    next();
  } catch (err) {
    logger.warn(`Invalid token attempt: ${token.substring(0, 10)}...`);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        status: 'error',
        error: "Unauthorized",
        message: "Token has expired"
      });
    }
    
    res.status(401).json({ 
      status: 'error',
      error: "Unauthorized",
      message: "Invalid authentication token"
    });
  }
};
