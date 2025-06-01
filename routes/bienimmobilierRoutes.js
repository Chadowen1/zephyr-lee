const express = require('express');
const router = express.Router();
const bienimmobilierController = require('../controllers/bienimmobilierController');

// GET /api/bienimmobilier
router.get('/', bienimmobilierController.getAllBienImmobiliers);

// POST /api/bienimmobilier
router.post('/', bienimmobilierController.createBienImmobilier);

// GET /api/bienimmobilier/:id
router.get('/:id', bienimmobilierController.getBienImmobilierById);

// GET /api/bienimmobilier/user/:userId
router.get('/user/:userId', bienimmobilierController.getbienImmobiliersByUserId);

// PUT /api/bienimmobilier/:id
router.put('/:id', bienimmobilierController.updateBienImmobilier);

// PATCH /api/bienimmobilier/:id
router.patch('/:id', bienimmobilierController.patchBienImmobilier);

// DELETE /api/bienimmobilier/:id
router.delete('/:id', bienimmobilierController.deleteBienImmobilier);

module.exports = router;