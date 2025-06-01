const { body } = require('express-validator');
const { isStrongPassword } = require('validator');

// Validation rules for user creation (signup)
exports.userValidationRules = () => [
  body('Nom')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must be less than 100 characters')
    .escape(),
  
  body('Email')
    .isEmail().withMessage('Invalid email')
    .normalizeEmail()
    .isLength({ max: 255 }).withMessage('Email must be less than 255 characters'),
  
  body('MotDePasse')
    .isLength({ min: 8 }).withMessage('Password must be at least 12 characters')
    .custom((value) => isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })).withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol'),
  
  body('Role')
    .isIn(['user', 'admin', 'agent']).withMessage('Invalid role'),
  
  body('Telephone')
    .isMobilePhone('any').withMessage('Invalid phone number')
    .escape(),
  
  body('Adress')
    .trim()
    .isLength({ max: 255 }).withMessage('Address must be less than 255 characters')
    .escape(),
  
  body('country_of_residence')
    .optional()
    .isLength({ max: 100 }).withMessage('Country must be less than 100 characters')
    .escape()
];

exports.loginValidationRules = () => [
  body('Email')
    .isEmail().withMessage('Invalid email')
    .normalizeEmail(),
  
  body('MotDePasse')
    .notEmpty().withMessage('Password is required')
];