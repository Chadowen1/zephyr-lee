const express = require('express');
const router = express.Router();
const transporteuridController = require('../controllers/transporteuridController');

// Create a new TransporteurID
router.post('/transporteurid', transporteuridController.createTransporteurID);

// Get all TransporteurIDs with pagination
router.get('/transporteurid', transporteuridController.getAllTransporteurIDs);

// Get a single TransporteurID by ID
router.get('/transporteurid/:id', transporteuridController.getTransporteurIDById);

// Update a TransporteurID by ID
router.put('/transporteurid/:id', transporteuridController.updateTransporteurID);

// Delete a TransporteurID by ID
router.delete('/transporteurid/:id', transporteuridController.deleteTransporteurID);

module.exports = router;