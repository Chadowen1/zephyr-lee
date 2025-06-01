const express = require('express');
const router = express.Router();
const transporteurController = require('../controllers/transporteurController');

router.get('/', transporteurController.getAllTransporteurs);
router.post('/', transporteurController.createTransporteur);
router.get('/:id', transporteurController.getTransporteurById);
router.put('/:id', transporteurController.updateTransporteur);
router.patch('/:id', transporteurController.patchTransporteur);
router.delete('/:id', transporteurController.deleteTransporteur);

module.exports = router;