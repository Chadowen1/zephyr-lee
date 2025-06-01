const { sanitize } = require('express-validator');

module.exports = (req, res, next) => {
  // Sanitize all string fields in body
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitize(req.body[key]).escape();
      }
    });
  }
  
  // Sanitize all string fields in query params
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === 'string') {
        req.query[key] = sanitize(req.query[key]).escape();
      }
    });
  }
  
  next();
};