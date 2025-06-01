const express = require('express');
const router = express.Router();
const utilityuseridController = require('../controllers/utilityuseridController');

// Create a new UtilityUserID
router.post('/utilityuserid', utilityuseridController.createUtilityUserID);

// Get all UtilityUserIDs with pagination
router.get('/utilityuserid', utilityuseridController.getAllUtilityUserIDs);

// Get a single UtilityUserID by ID
router.get('/utilityuserid/:id', utilityuseridController.getUtilityUserIDById);

// Update a UtilityUserID by ID
router.put('/utilityuserid/:id', utilityuseridController.updateUtilityUserID);

// Delete a UtilityUserID by ID
router.delete('/utilityuserid/:id', utilityuseridController.deleteUtilityUserID);

module.exports = router;