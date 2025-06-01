const express = require('express');
const router = express.Router();
const utilisateuridController = require('../controllers/utilisateuridController');

// Create a new UtilisateurID
router.post('/utilisateurid', utilisateuridController.createUtilisateurID);

// Get all UtilisateurIDs with pagination
router.get('/utilisateurid', utilisateuridController.getAllUtilisateurIDs);

// Get a single UtilisateurID by ID
router.get('/utilisateurid/:id', utilisateuridController.getUtilisateurIDById);

// Update a UtilisateurID by ID
router.put('/utilisateurid/:id', utilisateuridController.updateUtilisateurID);

// Delete a UtilisateurID by ID
router.delete('/utilisateurid/:id', utilisateuridController.deleteUtilisateurID);

module.exports = router;