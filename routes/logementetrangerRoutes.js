const express = require('express');
const router = express.Router();
const logementetrangerController = require('../controllers/logementetrangerController');

router.get('/', logementetrangerController.getAllLogementEtrangers);
router.post('/', logementetrangerController.createLogementEtranger);
router.get('/:id', logementetrangerController.getLogementEtrangerById);
router.get('/user/:userId', logementetrangerController.getLogementEtrangersByUserId);
router.put('/:id', logementetrangerController.updateLogementEtranger);
router.patch('/:id', logementetrangerController.patchLogementEtranger);
router.delete('/:id', logementetrangerController.deleteLogementEtranger);

module.exports = router;