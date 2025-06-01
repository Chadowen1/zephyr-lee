const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');
const { body, validationResult } = require('express-validator');

// Validation rules
const userValidationRules = [
  body('Nom').notEmpty().withMessage('Name is required'),
  body('Email').isEmail().withMessage('Invalid email'),
  body('MotDePasse').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('Role').notEmpty().withMessage('Role is required'),
  body('Adress').notEmpty().withMessage('Address is required'),
  body('Telephone').notEmpty().withMessage('Telephone is required'),
];

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
router.post('/', userValidationRules, validate, utilisateurController.createUtilisateur);
router.get('/', utilisateurController.getAllUtilisateurs);
router.get('/:id', utilisateurController.getUtilisateurById);
router.put('/:id', validate, utilisateurController.updateUtilisateur);
router.patch('/:id', utilisateurController.patchUtilisateur);
router.delete('/:id', utilisateurController.deleteUtilisateur);

// Special routes
router.post('/login', utilisateurController.login);
router.post('/utilisateur', userValidationRules, validate, utilisateurController.createUtilisateur);

module.exports = router;