const express = require('express');
const router = express.Router();
const logementetrangeridController = require('../controllers/logementetrangeridController');

// Create a new LogementEtrangerID
router.post('/logementetrangerid', logementetrangeridController.createLogementEtrangerID);

// Get all LogementEtrangerIDs with pagination
router.get('/logementetrangerid', logementetrangeridController.getAllLogementEtrangerIDs);

// Get a single LogementEtrangerID by ID
router.get('/logementetrangerid/:id', logementetrangeridController.getLogementEtrangerIDById);

// Update a LogementEtrangerID by ID
router.put('/logementetrangerid/:id', logementetrangeridController.updateLogementEtrangerID);

// Delete a LogementEtrangerID by ID
router.delete('/logementetrangerid/:id', logementetrangeridController.deleteLogementEtrangerID);

module.exports = router;