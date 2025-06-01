const express = require('express');
const router = express.Router();
const relocationAssistanceController = require('../controllers/relocationAssistanceController');

router.get('/', relocationAssistanceController.getAllRelocationAssistance);
router.post('/', relocationAssistanceController.createRelocationAssistance);
router.get('/:id', relocationAssistanceController.getRelocationAssistanceById);
router.put('/:id', relocationAssistanceController.updateRelocationAssistance);
router.patch('/:id', relocationAssistanceController.patchRelocationAssistance);
router.delete('/:id', relocationAssistanceController.deleteRelocationAssistance);

module.exports = router;